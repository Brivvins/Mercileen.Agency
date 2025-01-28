"use client";

import AdminCardComponent from "@/app/MyComponents/adminProperty";
import supabase from "@/supabase/client";
import { useEffect, useState } from "react";


const AdminLand = () => {
  const [properties, setProperties] = useState<Properties[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("Properties")
        .select("*")
        .eq("purpose", "sale")
        .eq("property_type", "land");

        console.log('Land data:', data);

      if (error) {
        throw error;
      }

      if (!data) {
        setProperties([]);
        return;
      }

      setProperties(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("Properties").delete().eq("id", id);
      if (error) throw error;

      setProperties((prev) => prev.filter((property) => property.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
      throw error; 
    }
  };

  if (isLoading) {
    return <div>Loading land...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (properties.length === 0) {
    return <div>No properties found</div>;

  }


  return (
    <>
    <div className="flex justify-center"> 
      <h2 className="text-2xl text-primary font-sans font-semibold">Here are the portions of land available for sale</h2>
    </div>
   
      <div className="container  ">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties && properties.map((property) => (
          <AdminCardComponent onDelete={handleDelete} key={property.id} property={property} />
        ))}
      </div>
    </div>
    </>
  )
}

export default AdminLand;