import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zaabtxvybtowcxcocnkz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphYWJ0eHZ5YnRvd2N4Y29jbmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTEzMDMsImV4cCI6MjA0MDM4NzMwM30.ImZMHlI0f6WHZP5ZH1XZ3cpavUMhQFHb1ByylYSHpoA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
