export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id?: number;
          title: string;
          description: string | null;
          price: number;
          purpose?: "rent" | "sale";
          property_type?: "land" | "house";
          bedrooms?: number | null;
          bathrooms?: number | null;
          location: string;
          isAvailable?: boolean;
          image: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          price: number;
          purpose: "rent" | "sale";
          property_type: "land" | "house";
          bedrooms?: number | null;
          bathrooms?: number | null;
          location: string;
          isAvailable?: boolean;
          image: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          price?: number;
          purpose?: "rent" | "sale";
          property_type?: "land" | "house";
          bedrooms?: number | null;
          bathrooms?: number | null;
          location?: string;
          isAvailable?: boolean;
          image?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
