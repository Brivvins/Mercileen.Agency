import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UpdatePropertyDialog from "./UpdatePropertyDialog"; // Import the update dialog

interface Props {
  property: Properties;
  onDelete: (id: number) => Promise<void>; // Add a delete handler passed from the parent
}



export default function AdminCardComponent({ property,  onDelete }: Props) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  
 
  const handleDelete = async () => {
    try {
      if (confirm(`Are you sure you want to delete "${property.title}"?`) && property.id) {
        await onDelete(property.id);
        alert("Property deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 overflow-hidden shadow-sm rounded-lg text-black m-5 transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:shadow-primary">
      
        <Image src={property.image} alt="image" height={70} width={650}  />
      
      <div className="m-2 text-primary font-bold">
        <p className="text-lg text-amber-500 font-bold">KSH {property.price}</p>
        {property.title}
      </div>
      <div className="m-2">
        <p className="line-clamp-1 overflow-hidden">{property.description}</p>
      </div>
      <div className="m-2.5 flex justify-between">
        {/* Update Button */}
        <Button variant="outline" onClick={() => setIsUpdateDialogOpen(true)}>
          Update
        </Button>

        {/* Delete Button */}
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>

      {/* Update Dialog */}
      {isUpdateDialogOpen  && (property.id && 
        <UpdatePropertyDialog 
          propertyId={property.id}
          onClose={() => setIsUpdateDialogOpen(false)} // Close dialog after updating
        />
      )}
    </div>
  );
}
