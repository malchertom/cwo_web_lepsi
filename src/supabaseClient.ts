import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;


console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey); // Make sure this prints a long string

export const supabase = createClient(supabaseUrl, supabaseKey);
