"use client";

import { motion } from "framer-motion";
import { Mail, Phone, UserCircle } from "lucide-react";
import Link from "next/link";

export function ContactSupport() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Contact <span className="text-primary">Support</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We're here to help! Reach out to our dedicated support team for any queries or assistance.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-background rounded-3xl p-8 md:p-12 soft-shadow border border-border/50 flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1 space-y-8 w-full">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <UserCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Support Representative</p>
                <p className="font-bold text-lg text-foreground">Prachi Shivale</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Support</p>
                <p className="font-bold text-lg text-foreground">+91 9561865706</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Support</p>
                <p className="font-bold text-lg text-foreground">prachishivale124@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Have a question?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is available from 9 AM to 6 PM, Monday to Saturday.
              For seller registration approvals, please contact us directly via email.
            </p>
            <Link
              href="/contact"
              className="w-full inline-flex justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Go to Contact Page
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
