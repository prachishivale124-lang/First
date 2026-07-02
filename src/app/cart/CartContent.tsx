"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";

export function CartContent() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const tax = cartTotal * 0.05; // 5% tax
  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 40;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mt-8 relative pb-32 lg:pb-0">
      {/* Cart Items */}
      <div className="lg:w-2/3">
        {cart.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
            <div className="flex justify-center flex-col items-center py-12">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-card-foreground">Your cart is empty</h3>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any fresh organic produce yet.</p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-12 shadow-sm text-lg rounded-full">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 md:p-6 border-b border-border bg-muted/30">
              <h2 className="text-xl font-bold text-card-foreground">Shopping Cart ({cart.length} items)</h2>
            </div>
            <div className="divide-y divide-border">
              {cart.map((item) => (
                <div key={item.id} className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 bg-card hover:bg-muted/10 transition-colors">
                  <Link href={`/products/${item.id}`} className="shrink-0 w-full sm:w-auto flex justify-center">
                    <div className="w-24 h-24 rounded-xl flex items-center justify-center border border-border bg-muted/20 relative overflow-hidden">
                      {/* Using the generic product image for demo since item.image might not exist locally */}
                      <Image src="/product-demo.png" alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                    </div>
                  </Link>
                  
                  <div className="flex-1 min-w-0 w-full">
                    <Link href={`/products/${item.id}`}>
                      <h4 className="font-bold text-lg text-foreground line-clamp-2 hover:text-primary transition-colors">{item.name}</h4>
                    </Link>
                    <p className="text-muted-foreground text-sm mt-1">Size/Weight: {item.weight}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-xl text-foreground">₹{item.price.toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="flex items-center border border-border rounded-full h-10 bg-background shadow-sm shrink-0">
                      <button 
                        className="w-10 h-full flex items-center justify-center rounded-l-full hover:bg-muted text-foreground transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center font-bold text-foreground">{item.quantity}</span>
                      <button 
                        className="w-10 h-full flex items-center justify-center rounded-r-full hover:bg-muted text-foreground transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      className="text-sm font-semibold text-destructive hover:text-destructive/80 flex items-center gap-1 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="lg:w-1/3">
          {/* Desktop Sticky Summary */}
          <div className="hidden lg:block bg-card border border-border rounded-xl p-6 sticky top-28 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-card-foreground">Order Summary</h3>
            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-medium text-foreground">₹{cartTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium text-primary">{shipping === 0 ? "FREE" : `₹${shipping.toFixed(0)}`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (5%)</span>
                <span className="font-medium text-foreground">₹{tax.toFixed(0)}</span>
              </div>
            </div>
            <div className="flex justify-between mb-8 items-end">
              <span className="text-lg font-bold text-foreground">Total Amount</span>
              <span className="text-3xl font-extrabold text-foreground">₹{finalTotal.toFixed(0)}</span>
            </div>
            <Link href="/checkout" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 text-lg rounded-full shadow-sm">
                Proceed to Buy <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Fixed Bottom Summary */}
          <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 pb-safe">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total Amount</span>
                <span className="text-xl font-extrabold text-foreground">₹{finalTotal.toFixed(0)}</span>
              </div>
              <Link href="/checkout" className="w-[60%]">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-full shadow-sm">
                  Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
