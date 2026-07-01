"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Store } from "lucide-react";

export function SellerRegistration() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-background rounded-3xl p-12 soft-shadow border border-border/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10" />

          <Store className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Seller / Farmer Registration
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our platform to sell your fresh organic produce directly to thousands of customers. 
            Register today and grow your business with Bhishma.
          </p>
          <Link
            href="/seller/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Register as a Seller
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
