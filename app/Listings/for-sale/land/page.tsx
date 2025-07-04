"use client";

import PCard from "@/app/MyComponents/PropertyCard";
import supabase from "@/supabase/client";
import { useEffect, useState } from "react";


const Land = () => {
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

  if (isLoading) {
    return <div>Loading Land...</div>;
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
      <h2 className="text-2xl text-primary font-sans font-semibold">Here are the land portions available for sale</h2>
    </div>
   
      <div className="container  ">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties && properties.map((property) => (
          <PCard directory={`../../../Listings/for-sale/land/${property.id}`} message = 'see land' key={property.id} property={property} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Land;