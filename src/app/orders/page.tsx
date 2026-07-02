"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING:    { label: "Pending",    color: "text-amber-600 bg-amber-50",   icon: Clock },
  PROCESSING: { label: "Processing", color: "text-blue-600 bg-blue-50",     icon: Package },
  SHIPPED:    { label: "Shipped",    color: "text-purple-600 bg-purple-50", icon: Truck },
  DELIVERED:  { label: "Delivered",  color: "text-green-600 bg-green-50",   icon: CheckCircle },
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/orders");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((data) => {
          setOrders(data.orders || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your purchase history</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border/50">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => {
              const cfg = statusConfig[order.status] || statusConfig.PENDING;
              const Icon = cfg.icon;
              return (
                <div key={order.id} className="bg-card rounded-2xl border border-border/50 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Order #{order.id.slice(-8).toUpperCase()}</p>
                      <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${cfg.color}`}>
                        <Icon className="w-4 h-4" />
                        {cfg.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
