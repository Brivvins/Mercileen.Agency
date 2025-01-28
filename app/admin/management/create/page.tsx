"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/supabase/client";
import { withAuth } from "@/app/MyComponents/WithAuth";

type InsertProperty = {
  id?: number;
  title: string;
  description?: string | null;
  price: string;
  purpose: "rent" | "sale";
  property_type: "land" | "house";
  bedrooms?: number | null;
  bathrooms?: number | null;
  location: string;
  is_available?: "yes" | "no";
  image: string; // Will store the public URL
  created_at?: string;
  updated_at?: string;
};

function InsertPropertyDialog() {
  const [formData, setFormData] = useState<InsertProperty>({
    title: "",
    description: null,
    price: "",
    purpose: "sale",
    property_type: "house",
    bedrooms: null,
    bathrooms: null,
    location: "",
    is_available: "yes",
    image: "", 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile); 
  };

  const handleSelectChange = (
    name: keyof InsertProperty,
    value: string | number | boolean
  ) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!formData.title || !formData.price || !formData.location) {
        throw new Error(
          "Please fill in all required fields (title, price, location)."
        );
      }

      let imageUrl = formData.image; 

      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("property-images") 
          .upload(fileName, file);

        if (uploadError) {
            console.error(error);
          throw new Error("Failed to upload image to Supabase.");
          
        }

        // Get the public URL of the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(fileName);

        if (publicUrlData) {
          imageUrl = publicUrlData.publicUrl; // Update the image URL
        }
      }

    
      const payload: InsertProperty = {
        ...formData,
        image: imageUrl, 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error: insertError } = await supabase
        .from("Properties")
        .insert(payload);

      if (insertError) {
        throw new Error(insertError.message);
      }

      console.log("Inserted data:", data);

      alert("Property inserted successfully!"); 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center min-h-screen">
      <Dialog>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h2 className="text-primary text-4xl mb-20 font-semibold font-serif">
            Click below to add a new property
          </h2>
          <DialogTrigger asChild>
            <Button className="text-xl font-serif shadow-md hover:shadow-cyan-400 hover:text-black  hover:text-2xl">Add New Property</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new property.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
            <Input
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <Input
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <Input type="file" accept="image/*" onChange={handleFileChange} />

            <Select
              onValueChange={(value) => handleSelectChange("purpose", value)}
              value={formData.purpose}
            >
              <SelectTrigger>Purpose</SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                handleSelectChange("property_type", value)
              }
              value={formData.property_type}
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
              onClick={() => setFormData({ ...formData })}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withAuth(InsertPropertyDialog);
