import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { PlusCircle, Package, TrendingUp } from "lucide-react";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);
  
  // Hardcode a mock seller ID if not logged in to show UI, or strict check
  const sellerId = session?.user?.id || "mock-seller-id";

  const products = await prisma.product.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your products, inventory, and view sales analytics.</p>
          </div>
          <Link href="/seller/products/new" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
            <PlusCircle className="w-5 h-5" />
            Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-2xl border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sales (₹)</p>
              <p className="text-2xl font-bold">₹0</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">Your Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground text-sm">
                <tr>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No products found. Start by adding your first product!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-background border border-border">
                          <Image src={product.image || "/images/tomato.png"} alt={product.name} fill className="object-cover" />
                        </div>
                        <span className="font-medium text-foreground">{product.name}</span>
                      </td>
                      <td className="p-4 font-medium text-foreground">₹{product.price}</td>
                      <td className="p-4 text-muted-foreground">{product.quantity}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                          Active
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-primary hover:underline text-sm font-medium">Edit</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
