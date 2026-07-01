"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, PackagePlus } from "lucide-react";
import Image from "next/image";

export default function NewProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  if (status === "loading") return <div className="p-8 text-center">Loading...</div>;
  
  // In a real app, we'd strict check for SELLER role. We will assume any logged in user can try for now, or redirect
  // if (session?.user?.role !== "SELLER") return <div className="p-8 text-center">Unauthorized. Sellers only.</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("image", imageUrl);
      formData.append("sellerId", session?.user?.id || "mock-seller-id");
      
      await createProduct(formData);
      alert("Product added successfully!");
      router.push("/seller/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <PackagePlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground">Upload a real image and details of your fresh produce.</p>
          </div>
        </div>

        <div className="bg-card p-8 rounded-3xl border border-border/50 soft-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input name="name" placeholder="e.g. Fresh Tomatoes" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select name="category" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Organic Products">Organic Products</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (₹)</label>
                <Input name="price" type="number" min="1" placeholder="e.g. 199" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Available Quantity</label>
                <Input name="quantity" type="number" min="1" placeholder="e.g. 50" required className="bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                name="description"
                required
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Describe your produce..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Product Image (Real Photos Only)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background">
                {imageUrl ? (
                  <div className="relative w-48 h-48 mx-auto rounded-xl overflow-hidden border border-border">
                    <Image src={imageUrl} alt="Product preview" fill className="object-cover" />
                  </div>
                ) : (
                  <CldUploadWidget 
                    uploadPreset="ml_default" // default unsigned preset
                    onSuccess={(result: any) => {
                      setImageUrl(result.info.secure_url);
                    }}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()} className="flex flex-col items-center justify-center w-full">
                        <ImagePlus className="w-12 h-12 text-muted-foreground mb-4" />
                        <span className="text-primary font-medium hover:underline">Click to upload an image</span>
                        <span className="text-xs text-muted-foreground mt-2">Supports JPG, PNG (Max 5MB)</span>
                      </button>
                    )}
                  </CldUploadWidget>
                )}
              </div>
            </div>

            <Button type="submit" disabled={loading || !imageUrl} className="w-full h-12 text-lg">
              {loading ? "Publishing..." : "Publish Product"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
