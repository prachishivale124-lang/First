import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Order Confirmed! | BHISHMA",
};

export default function OrderSuccessPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated Success Ring */}
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
          <CheckCircle className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl font-bold mb-3 text-foreground">Order Placed! 🎉</h1>
        <p className="text-muted-foreground text-lg mb-2">
          Thank you for shopping with <span className="text-primary font-bold">BHISHMA</span>
        </p>
        <p className="text-muted-foreground text-sm mb-10">
          Your fresh organic produce will be delivered within <strong>2–4 hours</strong>. A confirmation has been sent to your email.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-4 mb-10 text-left">
          <div className="bg-card border border-border/50 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Track your order</p>
              <p className="text-xs text-muted-foreground">Check real-time status in My Orders</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            <Package className="w-4 h-4" /> My Orders
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-colors"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
