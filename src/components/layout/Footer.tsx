"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <span className="text-2xl font-bold tracking-tighter text-gold">
                BHISHMA
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/80 mb-6 max-w-xs">
              "Healthy food. Natural living." <br />
              Delivering the freshest, pesticide-free organic produce directly to your door.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 cursor-pointer transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-4 h-4 bg-secondary-foreground rounded-sm"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 cursor-pointer transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-4 h-4 rounded-full bg-secondary-foreground"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 cursor-pointer transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-4 h-4 rounded-sm border-2 border-secondary-foreground"></div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Shop</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/products?category=vegetables" className="hover:text-gold transition-colors">Vegetables</Link></li>
              <li><Link href="/products?category=fruits" className="hover:text-gold transition-colors">Fruits</Link></li>
              <li><Link href="/products" className="hover:text-gold transition-colors">Organic Store</Link></li>
              <li><Link href="/offers" className="hover:text-gold transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold">Company</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Subscribe</h4>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Get updates on fresh arrivals and organic farming tips.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:border-gold transition-colors"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} Bhishma. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-secondary-foreground/60">
            Made with <Leaf className="w-3 h-3 text-primary mx-1" /> for a healthier future
          </div>
        </div>
      </div>
    </footer>
  );
}
