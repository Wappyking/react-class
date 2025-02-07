const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://cvuqcdejoebflevofhre.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dXFjZGVqb2ViZmxldm9maHJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzU0NDU3MSwiZXhwIjoyMDM5MTIwNTcxfQ.eZd9_55Mkuaw3fCkaRomgJ7TvTuoVidJ0eyZxj27XF4"
);

module.exports = supabase;
