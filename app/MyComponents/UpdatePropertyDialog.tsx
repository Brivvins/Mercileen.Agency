import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/supabase/client";

type UpdateProperty = {
  id?: number;
  title?: string;
  description?: string | null;
  price?: number;
  purpose?: "rent" | "sale";
  property_type?: "land" | "house";
  bedrooms?: number | null;
  bathrooms?: number | null;
  location?: string;
  is_available?: "yes" | "no";
  image?: string;
  created_at?: string;
  updated_at?: string;
};

interface UpdatePropertyDialogProps {
  propertyId: number;
  onClose: () => void; // Prop to handle closing the dialog
}

export default function UpdatePropertyDialog({
  propertyId,
  onClose,
}: UpdatePropertyDialogProps) {
  const [formData, setFormData] = useState<UpdateProperty>({ id: propertyId });
  const [file, setFile] = useState<File | null>(null); // Track file upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSelectChange = (name: keyof UpdateProperty, value: string | number | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!formData.id) {
        throw new Error("Property ID is required for updating.");
      }

      let imageUrl = formData.image;

      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        console.log("Uploading file:", fileName);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload Error:", uploadError.message);
          throw new Error(uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(fileName);

          if (publicUrlData) {
            imageUrl = publicUrlData.publicUrl; 
          }

      }

      const payload: UpdateProperty = {
        ...formData,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      };

      console.log("Payload to update:", payload);

      const { data, error: updateError } = await supabase
        .from("Properties")
        .update(payload)
        .eq("id", formData.id);

      if (updateError) {
        console.error("Update Error:", updateError.message);
        throw new Error(updateError.message);
      }

      console.log("Updated property:", data);
      alert("Property updated successfully!");

      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error:", err.message);
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Property</DialogTitle>
            <DialogDescription>
              Modify the details below to update this property.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
            />
            <Input
              placeholder="Location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // File upload input
            />
            <Select
              onValueChange={(value) => handleSelectChange("purpose", value)}
              value={formData.purpose || "rent"}
            >
              <SelectTrigger>Purpose</SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              onValueChange={(value) => handleSelectChange("property_type", value)}
              value={formData.property_type || "house"}
            >
              <SelectTrigger>Property Type</SelectTrigger>
              <SelectContent>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="house">House</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                handleSelectChange("is_available", value)
              }
              value={formData.is_available}
            >
              <SelectTrigger>Available</SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Bedrooms"
              name="bedrooms"
              value={formData.bedrooms || ""}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Bathrooms"
              name="bathrooms"
              value={formData.bathrooms || ""}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setFormData({ id: propertyId });
                onClose();
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
