"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, Leaf, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/CartContext";

// Simplified product details, normally this would be fetched based on the ID
const product = {
  id: "1",
  name: "Fresh Tomato",
  price: 399,
  weight: "1 kg",
  category: "Vegetables",
  image: "/images/tomato.png",
  isOrganic: true,
  color: "#ef4444"
};

export function ProductDetailClient({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Fake look up
  const currentProduct = { ...product, id: productId };

  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Product Image Gallery */}
      <div className="w-full md:w-1/2">
        <div className="glassmorphism rounded-3xl p-8 border border-border/50 aspect-square flex items-center justify-center relative bg-card overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div 
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{ background: `radial-gradient(circle at 30% 30%, ${currentProduct.color} 0%, transparent 70%)` }}
          >
            <span className="text-9xl opacity-80 mix-blend-overlay font-bold select-none text-white">
              {currentProduct.name[0]}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-card border border-border/50 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="mb-2">
          {currentProduct.isOrganic && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 font-medium mb-2">
              100% Organic
            </Badge>
          )}
          <div className="flex items-center gap-1 text-gold mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-muted-foreground text-sm ml-2">(128 reviews)</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{currentProduct.name}</h1>
        <p className="text-xl text-primary font-bold mb-6">₹{currentProduct.price.toFixed(0)} <span className="text-sm text-muted-foreground font-normal">/ {currentProduct.weight}</span></p>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Experience the true taste of nature with our handpicked, pesticide-free produce. Grown with love and care by our certified organic farming partners to ensure you get the best nutrition possible without any harmful chemicals.
        </p>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center border border-border rounded-full p-1 bg-card">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Button 
            size="lg" 
            className="flex-1 h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => addToCart(currentProduct, quantity)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button size="icon" variant="outline" className="h-12 w-12 rounded-full border-border hover:text-accent">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-border">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Pesticide Free</h4>
              <p className="text-xs text-muted-foreground">100% natural farming</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gold/10 text-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Farm Verified</h4>
              <p className="text-xs text-muted-foreground">Certified organic</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Next Day Delivery</h4>
              <p className="text-xs text-muted-foreground">Fresh to your door</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
