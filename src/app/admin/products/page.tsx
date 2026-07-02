import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { CheckCircle, XCircle, Package } from "lucide-react";

const prisma = new PrismaClient();

export const metadata = { title: "Product Management | Admin | BHISHMA" };

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") redirect("/login?callbackUrl=/admin/products");

  const products = await prisma.product.findMany({
    include: { seller: { select: { name: true } }, category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Product Management</h1>
          <p className="text-muted-foreground">Approve or reject seller product listings</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border/50">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No products</h2>
            <p className="text-muted-foreground">Products will appear here when sellers add them</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground text-xs">
                <tr>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Seller</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-muted-foreground">{p.seller?.name || "—"}</td>
                    <td className="p-4 text-muted-foreground">{p.category?.name || "—"}</td>
                    <td className="p-4 font-semibold">₹{p.price}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {p.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {!p.isApproved && (
                          <form action={`/api/admin/products/${p.id}/approve`} method="POST">
                            <button type="submit" className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-semibold">
                              <CheckCircle className="w-3.5 h-3.5" /> Approve
                            </button>
                          </form>
                        )}
                        <form action={`/api/admin/products/${p.id}/reject`} method="POST">
                          <button type="submit" className="flex items-center gap-1 text-xs px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold">
                            <XCircle className="w-3.5 h-3.5" /> Remove
                          </button>
                        </form>
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
