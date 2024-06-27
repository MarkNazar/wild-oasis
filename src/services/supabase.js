import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fhwutfgraedssffojrwx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZod3V0ZmdyYWVkc3NmZm9qcnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MDQxNzEsImV4cCI6MjAzMTE4MDE3MX0.RSxZPYvQUW93FY3_ks5jngRrpDJIGM3TJVcOgikOmYk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
