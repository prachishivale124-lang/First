"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Leaf } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-28 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-1"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm border border-primary/20"
            >
              <Leaf className="w-4 h-4" />
              100% ORGANIC MARKETPLACE
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-h1 text-foreground mb-6"
            >
              Fresh Pesticide-Free Food <br className="hidden xl:block" />
              <span className="text-primary relative inline-block">
                Delivered To Your Door
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-2 md:h-3 bg-accent/50 rounded-full"
                />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-body-lg text-muted-foreground mb-10 max-w-lg"
            >
              Shop directly from verified local farmers. Quality-checked, organic produce at the best prices.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto"
            >
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 text-base md:text-lg font-bold rounded-full shadow-[0_8px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_8px_30px_rgba(45,106,79,0.4)] transition-all hover:-translate-y-1 bg-primary text-primary-foreground">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              <Link href="/products?category=offers" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 text-base md:text-lg font-bold rounded-full border-2 border-border text-foreground hover:bg-muted transition-all hover:-translate-y-1">
                  View Offers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 relative flex justify-center order-2 mt-8 md:mt-0"
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              {/* Decorative background circle */}
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />
              
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <Image
                  src="/hero-illustration.png"
                  alt="Fresh Organic Vegetables"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
