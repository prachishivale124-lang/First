"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, ChevronDown, MessageCircle, Mail, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Vegetables", href: "/products?category=vegetables" },
        { name: "Fruits", href: "/products?category=fruits" },
        { name: "Organic Store", href: "/products" },
        { name: "Special Offers", href: "/offers" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ]
    },
    {
      title: "Customer Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Returns & Refunds", href: "/returns" },
        { name: "Contact Us", href: "/contact" },
        { name: "Track Order", href: "/orders" },
      ]
    },
    {
      title: "Seller Support",
      links: [
        { name: "Sell on Bhishma", href: "/seller" },
        { name: "Seller Dashboard", href: "/seller/dashboard" },
        { name: "Seller Guidelines", href: "/seller/guidelines" },
        { name: "Seller FAQ", href: "/seller/faq" },
      ]
    }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 md:pt-16 pb-8 md:pb-8 border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Brand Section */}
        <div className="mb-10 md:mb-12">
          <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
            <span className="text-3xl font-extrabold tracking-tighter text-accent">
              BHISHMA
            </span>
          </Link>
          <p className="text-sm md:text-base text-secondary-foreground/80 max-w-sm">
            "Healthy food. Natural living." <br />
            Delivering the freshest, pesticide-free organic produce directly to your door.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-6 text-accent uppercase tracking-wider text-sm">{section.title}</h4>
              <ul className="space-y-4 text-sm text-secondary-foreground/80">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-accent hover:translate-x-1 inline-block transition-transform duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion Layout */}
        <div className="md:hidden flex flex-col gap-2 mb-10">
          {footerSections.map((section) => {
            const isOpen = openSections[section.title];
            return (
              <div key={section.title} className="border-b border-secondary-foreground/10 last:border-0 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-accent"
                >
                  {section.title}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-secondary-foreground/60" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="pb-4 space-y-3 pl-2">
                        {section.links.map(link => (
                          <li key={link.name}>
                            <Link href={link.href} className="text-sm text-secondary-foreground/80 hover:text-accent transition-colors block py-1">
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 hover:text-accent hover:-translate-y-1 transition-all duration-300">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 hover:text-accent hover:-translate-y-1 transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 hover:text-accent hover:-translate-y-1 transition-all duration-300">
              <Share2 className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-secondary-foreground/60 mb-2">
              &copy; {new Date().getFullYear()} Bhishma. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-1 text-sm text-secondary-foreground/60">
              Made with <Leaf className="w-4 h-4 text-primary mx-1" /> for a healthier future
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
