import { createClient } from '@supabase/supabase-js';

// NOTE: These should be in environment variables (e.g., .env.local)
// For the purpose of this demo architecture, we assume they are injected.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
