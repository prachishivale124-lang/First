"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Package, Heart, Menu } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<{name: string, slug: string}[]>([]);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (data.categories) {
          setCategories(data.categories.slice(0, 7)); // Show up to 7 categories in nav
        }
      })
      .catch(console.error);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white border-b border-border"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* Mobile Left: Logo & Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-primary">
            BHISHMA
          </Link>
        </div>

        {/* Desktop Left: Logo */}
        <Link href="/" className="hidden md:block flex-shrink-0">
          <span className="text-2xl font-extrabold tracking-tight text-primary">
            BHISHMA
          </span>
        </Link>

        {/* Search Bar (Expandable on Mobile, Large on Desktop) */}
        <div className="flex-1 max-w-2xl relative">
          <form action="/search" className="w-full flex shadow-sm rounded-full overflow-hidden border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all bg-muted/30">
            <input 
              type="text" 
              name="q"
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm md:py-2.5 outline-none bg-transparent placeholder:text-muted-foreground text-foreground"
            />
            <button type="submit" className="bg-primary px-4 md:px-6 flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </button>
          </form>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          
          <Link href="/seller" className="text-sm font-medium text-accent hover:text-accent/80 flex items-center gap-1 transition-colors">
            <Package className="w-4 h-4" /> Sell
          </Link>
          
          <Link href="/categories" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Categories
          </Link>

          <div className="h-6 w-px bg-border" /> {/* Divider */}

          <Link href="/account/wishlist" className="flex flex-col items-center hover:text-primary transition-colors text-muted-foreground group">
            <Heart className="w-5 h-5 group-hover:fill-primary/20" />
            <span className="text-[10px] font-semibold mt-1">Wishlist</span>
          </Link>

          <Link href="/orders" className="flex flex-col items-center hover:text-primary transition-colors text-muted-foreground">
            <Package className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-1">Orders</span>
          </Link>

          <Link href="/account" className="flex flex-col items-center hover:text-primary transition-colors text-muted-foreground">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-1">Profile</span>
          </Link>

          <Link href="/cart" className="flex flex-col items-center hover:text-primary transition-colors text-muted-foreground relative">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold mt-1">Cart</span>
          </Link>

        </div>
      </div>
      
      {/* Desktop Secondary Nav (Categories) */}
      <div className="hidden md:flex bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 h-10 flex items-center gap-6">
          <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary">
            <Menu className="w-4 h-4" /> All Categories
          </Link>
          {categories.map(cat => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
