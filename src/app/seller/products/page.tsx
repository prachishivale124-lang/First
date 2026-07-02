"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, PlusCircle, Pencil, Trash2, TrendingUp, IndianRupee } from "lucide-react";

export default function SellerProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?callbackUrl=/seller/products");
    if (status === "authenticated" && session?.user?.role !== "SELLER") router.push("/seller/register");
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/seller/products")
        .then((r) => r.json())
        .then((d) => { setProducts(d.products || []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return <div className="pt-32 min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Products</h1>
            <p className="text-muted-foreground">Manage your product listings</p>
          </div>
          <Link
            href="/seller/products/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            <PlusCircle className="w-5 h-5" /> Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border/50">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No products yet</h2>
            <p className="text-muted-foreground mb-6">Add your first product to start selling</p>
            <Link href="/seller/products/add" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
              <PlusCircle className="w-4 h-4" /> Add Product
            </Link>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground text-sm">
                <tr>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium"><IndianRupee className="w-4 h-4 inline" />Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((p: any) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4">₹{p.price}</td>
                    <td className="p-4 text-muted-foreground">{p.quantity}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {p.isApproved ? "Live" : "Pending Approval"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
