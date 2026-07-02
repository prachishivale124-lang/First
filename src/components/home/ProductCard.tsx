"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  weight: string;
  category?: { name: string; slug: string } | string;
  imageUrls: string[];
  isOrganic: boolean;
  seller?: { name: string; farmName?: string };
  sellerName?: string;
  rating: number;
  reviewCount: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const originalPrice = product.price + (product.price * (product.discount / 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-emerald-200 transition-all duration-300 flex flex-col overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discount > 0 && (
          <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 font-bold px-2 py-0.5 rounded text-[11px]">
            {product.discount}% OFF
          </Badge>
        )}
      </div>
      
      <div className="absolute top-3 right-3 z-10">
        <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow">
          <Heart className={`w-4 h-4 ${isHovered ? "text-red-500 fill-red-500/10" : ""}`} />
        </button>
      </div>

      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative w-full aspect-square flex items-center justify-center p-6 bg-gray-50/50">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <div className="relative w-full h-full min-h-[160px]">
            <Image 
              src={product.imageUrls?.[0] || "/product-demo.png"} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2 mix-blend-multiply drop-shadow-md group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>
      </Link>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col z-10 bg-white">
        {/* Organic Badge & Seller */}
        <div className="flex items-center justify-between mb-1">
          {product.isOrganic && (
            <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3 mr-1" /> Organic
            </div>
          )}
          <span className="text-xs text-gray-500 font-medium">By {product.seller?.name || product.sellerName || "Farmer"}</span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`} className="block mt-1 mb-1">
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-emerald-700 ml-1.5 hover:underline cursor-pointer">{product.rating || 0} ({product.reviewCount || 0})</span>
        </div>

        <div className="text-xs text-gray-600 mb-3 bg-gray-100 w-max px-2 py-1 rounded-md font-medium">
          {product.weight}
        </div>
        
        {/* Price & Action */}
        <div className="mt-auto pt-4 flex flex-col xs:flex-row items-start xs:items-end justify-between gap-3">
          <div className="flex flex-col">
            {product.discount > 0 && (
              <span className="text-xs text-muted-foreground line-through mb-0.5">
                ₹{originalPrice.toFixed(0)}
              </span>
            )}
            <div className="flex items-start text-foreground">
              <span className="text-sm font-semibold mt-1">₹</span>
              <span className="text-2xl font-bold leading-none">{product.price.toFixed(0)}</span>
            </div>
          </div>
          <Button 
            className="w-full xs:w-auto rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5 h-9 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product as any);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
