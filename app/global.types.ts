import { Database as DB } from "@/lib/global.database.types";

declare global {
    type Database = DB
    type Properties = DB['public']['Tables']['properties']['Row']
}