
import { Database } from "@/lib/global.database.types";
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseKey = String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const supabase = createClient<Database>(supabaseUrl, supabaseKey);


export default supabase;