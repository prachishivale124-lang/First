"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { ArrowRight, Loader2 } from "lucide-react";

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const filters = ["All", "Vegetables", "Fruits"];

  useEffect(() => {
    setLoading(true);
    let url = "/api/products?limit=10";
    if (activeFilter !== "All") {
      url += `&category=${activeFilter.toLowerCase()}`;
    }
    
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setProducts(d.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeFilter]);

  return (
    <section className="py-16 md:py-24 bg-background relative" id="products">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-h2 text-foreground mb-2 flex items-center gap-2"
            >
              Today's <span className="text-primary">Fresh Harvest</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-body text-muted-foreground"
            >
              100% organic, pesticide-free produce straight from trusted farms.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-2 overflow-x-auto pb-2 no-scrollbar"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                  activeFilter === filter
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : "bg-background border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No products available at the moment.
          </div>
        ) : (
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 pb-6 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {products.map((product, index) => (
              <div key={product.id} className="min-w-[75vw] sm:min-w-[45vw] md:min-w-0 snap-start snap-always">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-10 md:mt-12 text-center">
          <Link href="/products" className="text-primary font-bold hover:text-primary/80 transition-colors inline-flex items-center gap-2 group bg-background border border-border px-8 py-3 rounded-full hover:shadow-md">
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
