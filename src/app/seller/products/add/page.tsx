"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Package, ArrowLeft, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  
  const [form, setForm] = useState({
    name: "", description: "", price: "", quantity: "", weight: "",
    isOrganic: true, categoryId: "", discount: "0", farmLocation: "", harvestDate: "", expiryDate: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then(r => r.json())
      .then(d => {
        setCategories(d.categories || []);
        if (d.categories?.length > 0) setForm(f => ({ ...f, categoryId: d.categories[0].id }));
      });
  }, []);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      setError("Please select a category");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let imageUrls: string[] = [];
      
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Image upload failed");
        imageUrls.push(uploadData.url);
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          quantity: parseInt(form.quantity),
          discount: parseFloat(form.discount || "0"),
          imageUrls,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");
      
      router.push("/seller/products");
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/seller/products" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="bg-card p-8 rounded-3xl border border-border/50 soft-shadow">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Add New Product</h1>
              <p className="text-muted-foreground text-sm">Fill the details below to list your product</p>
            </div>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-5 text-sm border border-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload Area */}
            <div>
              <label className="block text-sm font-medium mb-2">Product Image</label>
              <div className="flex items-start gap-6">
                <div className="relative w-32 h-32 rounded-2xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center overflow-hidden group">
                  {preview ? (
                    <Image src={preview} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                      <span className="text-[10px] text-muted-foreground">Upload Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white z-0 pointer-events-none">
                    <Upload className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1 text-sm text-muted-foreground pt-2">
                  <p className="font-medium text-foreground mb-1">Upload a clear photo of your product.</p>
                  <p>Customers are more likely to buy products with high-quality images. Recommended format: JPG, PNG.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Product Name *</label>
                <input required value={form.name} onChange={(e) => set("name", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  placeholder="e.g., Organic Tomatoes" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Category *</label>
                <select required value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background">
                  <option value="" disabled>Select a category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background resize-none"
                placeholder="Describe your product..." />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Price (₹) *</label>
                <input required type="number" min="1" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  placeholder="99" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Discount (%)</label>
                <input type="number" min="0" max="90" value={form.discount} onChange={(e) => set("discount", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Stock *</label>
                <input required type="number" min="0" value={form.quantity} onChange={(e) => set("quantity", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  placeholder="50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Weight/Unit</label>
                <input value={form.weight} onChange={(e) => set("weight", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  placeholder="1kg or 1 Dozen" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Farm Location</label>
                <input value={form.farmLocation} onChange={(e) => set("farmLocation", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                  placeholder="e.g., Pune" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Harvest Date</label>
                <input type="date" value={form.harvestDate} onChange={(e) => set("harvestDate", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
                <input type="date" value={form.expiryDate} onChange={(e) => set("expiryDate", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background" />
              </div>
            </div>

            <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/20">
              <input type="checkbox" id="organic" checked={form.isOrganic} onChange={(e) => set("isOrganic", e.target.checked)}
                className="w-5 h-5 accent-primary" />
              <label htmlFor="organic" className="text-sm font-medium cursor-pointer">
                ✅ Certify this product is <strong>100% Organic & Pesticide-Free</strong>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 text-base shadow-md">
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
