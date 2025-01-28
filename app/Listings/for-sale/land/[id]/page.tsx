import PropertyView from "@/app/MyComponents/PropertyView";
import supabase from "@/supabase/client";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>

export default async function HouseId({ params }: { params: Params }) {
  const {id} = await params
  const { data:property, error } = await supabase
    .from("Properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <div>
        <PropertyView property={property} />
    </div>
  );
}
