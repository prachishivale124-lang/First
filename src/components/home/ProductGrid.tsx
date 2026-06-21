"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard, Product } from "./ProductCard";

const DUMMY_PRODUCTS: Product[] = [
  { id: "1", name: "Fresh Tomato", price: 4.99, weight: "1 kg", category: "Vegetables", image: "/images/tomato.png", isOrganic: true, color: "#ef4444" },
  { id: "2", name: "Organic Potato", price: 3.49, weight: "2 kg", category: "Vegetables", image: "/images/potato.png", isOrganic: true, color: "#d97706" },
  { id: "3", name: "Crispy Carrot", price: 2.99, weight: "1 kg", category: "Vegetables", image: "/images/carrot.png", isOrganic: true, color: "#f97316" },
  { id: "4", name: "Green Spinach", price: 5.99, weight: "500 g", category: "Vegetables", image: "/images/spinach.png", isOrganic: true, color: "#22c55e" },
  { id: "5", name: "Sweet Apple", price: 6.99, weight: "1 kg", category: "Fruits", image: "/images/apple.png", isOrganic: true, color: "#dc2626" },
  { id: "6", name: "Alphonso Mango", price: 8.99, weight: "1 kg", category: "Fruits", image: "/images/mango.png", isOrganic: true, color: "#fbbf24" },
  { id: "7", name: "Juicy Orange", price: 5.49, weight: "1 kg", category: "Fruits", image: "/images/orange.png", isOrganic: true, color: "#f97316" },
  { id: "8", name: "Fresh Banana", price: 2.49, weight: "1 kg", category: "Fruits", image: "/images/banana.png", isOrganic: true, color: "#facc15" },
];

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Vegetables", "Fruits"];
  
  const filteredProducts = activeFilter === "All" 
    ? DUMMY_PRODUCTS 
    : DUMMY_PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section className="py-24 bg-background relative" id="products">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Fresh From <span className="text-primary">The Farm</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Discover our handpicked selection of 100% organic, pesticide-free produce delivered straight to your kitchen.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="text-primary font-semibold hover:text-gold transition-colors inline-flex items-center gap-2 group">
            View All Products
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
