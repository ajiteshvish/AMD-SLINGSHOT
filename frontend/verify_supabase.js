import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ffomgdqzpufpsacsclii.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmb21nZHF6cHVmcHNhY3NjbGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDEzMzYsImV4cCI6MjA4NjgxNzMzNn0.Oaf7jPZbDBO8KfOWY9ntmob5caUd31YzjhdXPh4vcd0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
  console.log("Checking Supabase connection...");
  // Try to select from the profiles table
  const { data, error } = await supabase.from('profiles').select('id').limit(1);

  if (error) {
    console.log("❌ Connection Error or Table Missing:");
    console.log(`Error Message: ${error.message}`);
    console.log(`Error Code: ${error.code}`);
    if (error.code === '42P01') {
      console.log("\n⚠️ DIAGNOSIS: The 'profiles' table does not exist yet.");
      console.log("ACTION REQUIRED: You need to run the SQL commands in 'supabase_schema.sql' in your Supabase SQL Editor.");
    }
  } else {
    console.log("✅ Connection Successful!");
    console.log("✅ 'profiles' table exists and is accessible.");
  }
}

verify();
