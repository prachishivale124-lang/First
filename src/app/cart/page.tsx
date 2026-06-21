import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";

export const metadata = {
  title: "Your Cart | BHISHMA",
};

export default function CartPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="border border-border rounded-xl p-6 mb-6">
              <div className="flex justify-center flex-col items-center py-12 text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">🛒</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Looks like you haven't added any fresh produce yet.</p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-primary">$0.00</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12" disabled>
                  Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
