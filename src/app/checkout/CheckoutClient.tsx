"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

export function CheckoutClient() {
  const { cart, clearCart, cartTotal } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      alert("Order placed successfully!");
      router.push("/");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-card border border-border p-8 rounded-xl text-center max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">You need to add items to your cart before checking out.</p>
        <Button onClick={() => router.push("/products")} className="bg-primary hover:bg-primary/90 text-white">
          Return to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-8 rounded-xl text-left max-w-lg mx-auto">
      <div className="mb-6 pb-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p className="text-muted-foreground">You are purchasing {cart.length} items for a total of ₹{(cartTotal + (cartTotal > 50 ? 0 : 50) + (cartTotal * 0.05)).toFixed(0)}.</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <Input placeholder="John" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <Input placeholder="Doe" required />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Address</label>
          <Input placeholder="123 Farm Lane" required />
        </div>
        <div>
          <label className="block text-sm mb-1">City</label>
          <Input placeholder="Greenville" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">State</label>
            <Input placeholder="CA" required />
          </div>
          <div>
            <label className="block text-sm mb-1">ZIP Code</label>
            <Input placeholder="90210" required />
          </div>
        </div>
        <Button 
          className="w-full mt-6 bg-primary hover:bg-primary/90 text-white" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
      </form>
    </div>
  );
}
