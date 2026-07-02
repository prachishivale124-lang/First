"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING:    { label: "Pending",    color: "text-amber-600 bg-amber-50",   icon: Clock },
  PROCESSING: { label: "Processing", color: "text-blue-600 bg-blue-50",     icon: Package },
  SHIPPED:    { label: "Shipped",    color: "text-purple-600 bg-purple-50", icon: Truck },
  DELIVERED:  { label: "Delivered",  color: "text-green-600 bg-green-50",   icon: CheckCircle },
};

export default function SellerOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?callbackUrl=/seller/orders");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/seller/orders")
        .then((r) => r.json())
        .then((d) => { setOrders(d.orders || []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return <div className="pt-32 min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Seller Orders</h1>
          <p className="text-muted-foreground">Manage and fulfil customer orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border/50">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground">Your orders will appear here once customers start buying</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground text-sm">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o: any) => {
                  const cfg = statusConfig[o.status] || statusConfig.PENDING;
                  const Icon = cfg.icon;
                  return (
                    <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-xs font-mono text-muted-foreground">#{o.id.slice(-8).toUpperCase()}</td>
                      <td className="p-4 font-medium">{o.orderItems?.[0]?.product?.name || "—"}</td>
                      <td className="p-4 font-semibold">₹{o.total?.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
                          <Icon className="w-3.5 h-3.5" /> {cfg.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-primary hover:underline text-sm font-medium">Update Status</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
