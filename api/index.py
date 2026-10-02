"""
Vercel Serverless Function entry point for Life Haven API (/api/*).
"""

from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from urllib.parse import urlparse, parse_qs

# Ensure root directory is in sys.path so 'backend' package is found
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.router import dispatch_request


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query_params = parse_qs(parsed.query)

        # 1. Config endpoint
        if path in ("/api/config", "/api/config/"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = {
                "success": True,
                "supabase_url": os.environ.get("SUPABASE_URL", "").strip(),
                "supabase_anon_key": os.environ.get("SUPABASE_ANON_KEY", "").strip(),
                "status": "online"
            }
            self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))
            return

        # 2. System Status endpoint
        if path in ("/api/status", "/api/status/"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = {
                "success": True,
                "data": {
                    "appName": "Life Haven",
                    "status": "online",
                    "supabaseConfigured": bool(os.environ.get("SUPABASE_URL")),
                    "environment": "vercel"
                }
            }
            self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))
            return

        # 3. Router dispatch
        status_code, response_data = dispatch_request("GET", path, query_params)
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(response_data, indent=2).encode("utf-8"))

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
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": f"Invalid JSON payload: {str(e)}"}).encode("utf-8"))
                return

        status_code, response_data = dispatch_request("POST", path, query_params, payload)
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(response_data, indent=2).encode("utf-8"))
