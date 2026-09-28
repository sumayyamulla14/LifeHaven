"""
LIFE HAVEN — INTEGRATED PYTHON BACKEND & STATIC WEB SERVER (PHASE 2)

Designed for BCA Student understanding:
- Uses ONLY Python Standard Library (http.server, socketserver, urllib, json, os, sys).
- Serves the complete frontend (HTML, CSS, JavaScript).
- Routes all REST API calls (/api/*) to backend controllers with clean JSON responses:
    Success: {"success": true, "data": {...}}
    Error:   {"success": false, "error": "..."}
- Loads environment variables safely from .env without exposing secrets.
"""

import http.server
import socketserver
import json
import urllib.request
import urllib.error
from urllib.parse import urlparse, parse_qs
import os
import sys

# Ensure UTF-8 output handling on Windows
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
if DIRECTORY not in sys.path:
    sys.path.insert(0, DIRECTORY)

# Import our modular backend router
from backend.router import dispatch_request


def load_env(filepath=None):
    """Load key-value pairs from .env into os.environ with zero external dependencies."""
    if filepath is None:
        filepath = os.path.join(DIRECTORY, ".env")
    env_vars = {}
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip("'\"")
                        env_vars[k] = v
                        os.environ[k] = v
        except Exception as e:
            print(f"[LifeHaven Server] Warning reading .env: {e}")
    return env_vars


# Initial load of environment variables
load_env()

PORT = int(os.environ.get("PORT", 3000))


class LifeHavenHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stdout.write(f"[LifeHaven Server] {self.address_string()} - {format % args}\n")

    def send_json_response(self, status_code: int, data: dict):
        """Sends standardized JSON responses with proper CORS headers."""
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))

    def do_OPTIONS(self):
        """Handles browser pre-flight CORS verification."""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query_params = parse_qs(parsed.query)

        # 1. System Status Endpoint
        if path == "/api/status":
            load_env()
            api_key = os.environ.get("GEMINI_API_KEY", "").strip()
            is_valid_format = bool(api_key and api_key != "your_gemini_api_key_here")
            masked_key = ""
            if is_valid_format and len(api_key) > 8:
                masked_key = f"{api_key[:4]}...{api_key[-4:]}"

            self.send_json_response(200, {
                "success": True,
                "data": {
                    "appName": "Life Haven",
                    "status": "online",
                    "backendPhase": 2,
                    "apiKeyConfigured": is_valid_format,
                    "maskedKey": masked_key,
                    "supabaseConfigured": bool(os.environ.get("SUPABASE_URL")),
                    "model": os.environ.get("GEMINI_MODEL", "gemini-1.5-flash"),
                    "serverPort": PORT
                }
            })
            return

        # 2. Life Haven REST API Endpoints
        if path.startswith("/api/"):
            try:
                status_code, response_data = dispatch_request("GET", path, query_params)
                self.send_json_response(status_code, response_data)
            except Exception as e:
                print(f"[LifeHaven Server] Internal Error handling GET {path}: {e}")
                self.send_json_response(500, {
                    "success": False,
                    "error": f"Internal Server Error: {str(e)}"
                })
            return

        # 3. Fallback to serving static frontend files (HTML, CSS, JS)
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query_params = parse_qs(parsed.query)

        content_length = int(self.headers.get("Content-Length", 0))
        body_bytes = self.rfile.read(content_length) if content_length > 0 else b""
        payload = {}

        if body_bytes:
            try:
                payload = json.loads(body_bytes.decode("utf-8"))
            except Exception as e:
                self.send_json_response(400, {
                    "success": False,
                    "error": f"Invalid JSON payload: {str(e)}"
                })
                return

        # 1. Legacy AI endpoints (Gemini Integration)
        if path == "/api/ai/generate":
            self.handle_gemini_generate(payload)
            return
        elif path == "/api/ai/save-key":
            self.handle_gemini_save_key(payload)
            return

        # 2. Life Haven REST API Endpoints
        if path.startswith("/api/"):
            try:
                status_code, response_data = dispatch_request("POST", path, query_params, payload)
                self.send_json_response(status_code, response_data)
            except Exception as e:
                print(f"[LifeHaven Server] Internal Error handling POST {path}: {e}")
                self.send_json_response(500, {
                    "success": False,
                    "error": f"Internal Server Error: {str(e)}"
                })
            return

        super().do_POST()

    def handle_gemini_generate(self, payload: dict):
        """Proxy handler for Google Gemini AI calls."""
        load_env()
        api_key = os.environ.get("GEMINI_API_KEY", "").strip()
        if not api_key or api_key == "your_gemini_api_key_here":
            self.send_json_response(400, {
                "success": False,
                "error": "GEMINI_API_KEY is not configured in .env file.",
                "tip": "Open .env and set your Google Gemini API key if you wish to use AI generation."
            })
            return

        model = os.environ.get("GEMINI_MODEL", "gemini-1.5-flash")
        user_prompt = payload.get("prompt", "")
        system_instruction = payload.get("systemInstruction", "")
        json_mode = payload.get("jsonMode", False)

        gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        gemini_payload = {
            "contents": [{"parts": [{"text": user_prompt}]}]
        }

        if system_instruction:
            gemini_payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}
        if json_mode:
            gemini_payload["generationConfig"] = {"responseMimeType": "application/json"}

        try:
            req_data = json.dumps(gemini_payload).encode("utf-8")
            req = urllib.request.Request(
                gemini_url,
                data=req_data,
                headers={"Content-Type": "application/json"},
                method="POST"
            )

            with urllib.request.urlopen(req, timeout=30) as response:
                res_body = response.read().decode("utf-8")
                res_data = json.loads(res_body)
                candidate_text = ""
                try:
                    candidate_text = res_data["candidates"][0]["content"]["parts"][0]["text"]
                except (KeyError, IndexError):
                    candidate_text = json.dumps(res_data)

                self.send_json_response(200, {
                    "success": True,
                    "data": {
                        "text": candidate_text,
                        "model": model
                    }
                })
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode("utf-8", errors="ignore")
            self.send_json_response(e.code, {"success": False, "error": f"AI API error: {err_msg}"})
        except Exception as e:
            self.send_json_response(500, {"success": False, "error": f"Internal Error: {str(e)}"})

    def handle_gemini_save_key(self, payload: dict):
        """Saves environment settings to .env file."""
        try:
            new_key = payload.get("apiKey", "").strip()
            new_model = payload.get("model", "gemini-1.5-flash").strip()
            env_path = os.path.join(DIRECTORY, ".env")
            with open(env_path, "w", encoding="utf-8") as f:
                f.write("# ==========================================================\n")
                f.write("# LIFE HAVEN — ENVIRONMENT CONFIGURATION\n")
                f.write("# ==========================================================\n")
                f.write("PORT=3000\n")
                f.write("HOST=127.0.0.1\n")
                f.write("DEBUG=True\n\n")
                f.write("SECRET_KEY=\n")
                f.write("SUPABASE_URL=\n")
                f.write("SUPABASE_ANON_KEY=\n")
                f.write("SUPABASE_SERVICE_ROLE_KEY=\n")
                f.write("ADMIN_EMAILS=\n\n")
                f.write(f"GEMINI_API_KEY={new_key}\n")
                f.write(f"GEMINI_MODEL={new_model}\n")

            load_env()
            self.send_json_response(200, {
                "success": True,
                "data": {"message": "Successfully saved configurations to .env"}
            })
        except Exception as e:
            self.send_json_response(500, {"success": False, "error": str(e)})


def run():
    os.chdir(DIRECTORY)
    # Enable address reuse so server restarts cleanly without port collision
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), LifeHavenHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 65)
        print("  [+] LIFE HAVEN — Health & Wellness Backend (Phase 2 Active)")
        print(f"  [*] Server URL: {url}")
        print("  [*] API Routing: Ready (/api/dashboard, /api/workouts, /api/period, etc.)")
        print("  [*] Database Prep: In-memory store ready for Supabase Phase 3")
        print("  [*] Technology: Python Standard Library")
        print("=" * 65)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[LifeHaven Server] Gracefully shutting down...")
            httpd.server_close()


if __name__ == "__main__":
    run()
