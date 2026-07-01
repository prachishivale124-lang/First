"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export function CartContent() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const tax = cartTotal * 0.05; // 5% tax
  const shipping = cartTotal > 50 || cartTotal === 0 ? 0 : 5.99;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Cart Items */}
      <div className="lg:w-2/3">
        {cart.length === 0 ? (
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
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="border border-border rounded-xl p-4 flex items-center gap-4 bg-card">
                <div 
                  className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${item.color} 0%, transparent 70%)` }}
                >
                  <span className="text-2xl opacity-80 mix-blend-overlay font-bold select-none">{item.name[0]}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg line-clamp-1">{item.name}</h4>
                  <p className="text-muted-foreground text-sm">{item.weight}</p>
                  <div className="font-bold mt-1">₹{item.price.toFixed(0)}</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-full p-1 bg-background">
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="lg:w-1/3">
        <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{cartTotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "Free" : `₹${shipping.toFixed(0)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">₹{tax.toFixed(0)}</span>
            </div>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-xl font-bold text-primary">₹{finalTotal.toFixed(0)}</span>
          </div>
          <Link href="/checkout" className={cart.length === 0 ? "pointer-events-none" : ""}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12" disabled={cart.length === 0}>
              Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
