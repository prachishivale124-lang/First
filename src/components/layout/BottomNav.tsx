"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/CartContext";

export function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Categories", href: "/categories", icon: LayoutGrid },
    { name: "Search", href: "/search", icon: Search },
    { name: "Cart", href: "/cart", icon: ShoppingCart, count: cartCount },
    { name: "Account", href: "/account", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 pb-safe">
      <nav className="flex justify-between items-center px-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="relative">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                  {item.count ? (
                    <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  ) : null}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
