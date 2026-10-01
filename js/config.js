/**
 * LIFE HAVEN — CLIENT CONFIGURATION & SUPABASE BOOTSTRAP
 * ========================================================
 * Dynamically loads public Supabase configuration from environment variables
 * via the backend `/api/config` endpoint.
 * 
 * SECURITY:
 * - NO API keys or secrets are hardcoded in source files.
 * - Only public anon keys and Supabase URLs are loaded into the browser.
 * - Service-role keys NEVER leave the server environment.
 */

const AppConfig = {
  API_BASE_URL: (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') 
    ? window.location.origin 
    : 'http://localhost:3000',
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',
  isSupabaseConfigured: false,

  /**
   * Fetch runtime environment configuration from backend and initialize Supabase client.
   */
  async load() {
    if (this.isSupabaseConfigured) return window.supabaseClient;

    try {
      const res = await fetch(`${this.API_BASE_URL}/api/config`);
      if (res.ok) {
        const data = await res.json();
        this.SUPABASE_URL = (data.supabase_url || '').trim();
        this.SUPABASE_ANON_KEY = (data.supabase_anon_key || '').trim();

        if (this.SUPABASE_URL && this.SUPABASE_ANON_KEY && window.supabase) {
          try {
            window.supabaseClient = window.supabase.createClient(
              this.SUPABASE_URL,
              this.SUPABASE_ANON_KEY
            );
            this.isSupabaseConfigured = true;
            console.log('[LifeHaven Config] Supabase client initialized successfully.');
            return window.supabaseClient;
          } catch (initErr) {
            console.warn('[LifeHaven Config] Supabase client initialization warning:', initErr);
          }
        }
      }
    } catch (err) {
      console.log('[LifeHaven Config] Running in offline/standard local backend mode.');
    }
    return null;
  }
};

window.AppConfig = AppConfig;
if (typeof window !== 'undefined') {
  AppConfig.load();
}
