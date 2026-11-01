import { createClient } from "@supabase/supabase-js";

// ============================================================================
// SUPABASE CONFIGURATION
// Replace the values below with your own Supabase project credentials if needed.
// ============================================================================

// 1. Paste your Supabase Project URL here:
const SUPABASE_URL = "https://shfzwwajqvtlkffetqlu.supabase.co";

// 2. Paste your Supabase Publishable / Anon Public Key here:
const SUPABASE_PUBLIC_KEY = "sb_publishable_HHMYyLE0equS3aVW0rVkKw_dV1SY07G";

// ============================================================================
// Export initialized Supabase client
// ============================================================================
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
