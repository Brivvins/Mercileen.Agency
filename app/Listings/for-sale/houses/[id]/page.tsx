import PropertyView from '@/app/MyComponents/PropertyView';
import supabase from '@/supabase/client';
import { notFound } from 'next/navigation';

export default async function HouseId({ params }: { params: { id: string } }) {
  const id = params.id
  const { data:property, error } = await supabase
    .from('Properties')
    .select('*')
    .eq('id',id )
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <div>
      <PropertyView property={property}/>
    </div>
  );
}