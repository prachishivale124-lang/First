"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Truck, HeartPulse } from "lucide-react";

export function TrustSection() {
  const cards = [
    {
      title: "100% Pesticide Free",
      description: "We guarantee that all our produce is grown without harmful chemicals or synthetic pesticides.",
      icon: <Leaf className="w-8 h-8 text-white" />,
      color: "bg-primary",
    },
    {
      title: "Farm Verified",
      description: "Every farm we partner with is strictly vetted and verified for sustainable organic practices.",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      color: "bg-gold",
    },
    {
      title: "Fresh Delivery",
      description: "From farm to your doorstep within 24 hours to ensure maximum freshness and nutritional value.",
      icon: <Truck className="w-8 h-8 text-white" />,
      color: "bg-accent",
    },
    {
      title: "Healthy Lifestyle",
      description: "Promoting a healthier way of living by providing pure, natural food the way nature intended.",
      icon: <HeartPulse className="w-8 h-8 text-white" />,
      color: "bg-secondary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } },
  };

  return (
    <section className="py-24 bg-card relative overflow-hidden" id="trust">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Why Choose <span className="text-primary">Bhishma?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We are committed to delivering the purest natural foods while supporting sustainable farming communities.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-background rounded-2xl p-8 border border-border/50 soft-shadow text-center flex flex-col items-center group transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300 ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}
