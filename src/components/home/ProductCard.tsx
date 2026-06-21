"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  category: string;
  image: string;
  isOrganic: boolean;
  color: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative glassmorphism rounded-2xl p-4 h-full flex flex-col transition-all duration-300 hover:green-glow hover:-translate-y-2 border border-border/50 bg-card overflow-hidden">
        
        {/* Background Decorative Blob */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 transition-opacity duration-300"
          style={{ backgroundColor: product.color, opacity: isHovered ? 0.4 : 0.1 }}
        />

        {/* Top Badges & Actions */}
        <div className="flex justify-between items-start z-10 mb-2">
          {product.isOrganic && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 font-medium">
              100% Organic
            </Badge>
          )}
          <button className="text-muted-foreground hover:text-accent transition-colors p-2 bg-background/50 backdrop-blur-md rounded-full">
            <Heart className={`w-4 h-4 ${isHovered ? "text-accent fill-accent/20" : ""}`} />
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-square mb-4 z-10 flex items-center justify-center">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* Placeholder for actual image - using a colored div for abstract look since we don't have images */}
            <div 
              className="absolute inset-0 m-4 rounded-full shadow-inner flex items-center justify-center"
              style={{ background: `radial-gradient(circle at 30% 30%, ${product.color} 0%, transparent 70%)` }}
            >
              <span className="text-6xl opacity-80 mix-blend-overlay font-bold select-none">
                {product.name[0]}
              </span>
            </div>
            {/* Actual image tag for production */}
            {/* <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-contain drop-shadow-xl"
            /> */}
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col z-10">
          <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
          <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="text-sm text-muted-foreground mb-4">{product.weight}</div>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground line-through opacity-70">
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <span className="text-xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <Button size="icon" className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white shadow-md group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
