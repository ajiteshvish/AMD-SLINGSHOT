import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ffomgdqzpufpsacsclii.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmb21nZHF6cHVmcHNhY3NjbGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDEzMzYsImV4cCI6MjA4NjgxNzMzNn0.Oaf7jPZbDBO8KfOWY9ntmob5caUd31YzjhdXPh4vcd0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
