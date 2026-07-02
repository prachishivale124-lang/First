"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Sprout, Leaf, ShieldCheck, Package, Home } from "lucide-react";

export function FarmerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    {
      title: "Farmer Direct",
      description: "Fresh produce sourced directly from trusted farmers.",
      icon: <Sprout className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />,
    },
    {
      title: "Fresh Picking",
      description: "Vegetables and fruits are picked at peak freshness.",
      icon: <Leaf className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />,
    },
    {
      title: "Quality Check",
      description: "Every product passes quality checks before delivery.",
      icon: <ShieldCheck className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />,
    },
    {
      title: "Eco Packaging",
      description: "Eco-friendly packaging keeps products fresh.",
      icon: <Package className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />,
    },
    {
      title: "Fast Delivery",
      description: "Fast delivery from farms directly to your doorstep.",
      icon: <Home className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />,
    },
  ];

  return (
    <section 
      className="py-16 md:py-24 bg-background relative overflow-hidden" 
      ref={containerRef} 
      id="process"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 font-extrabold mb-4 text-foreground tracking-tight"
          >
            From Farm To <span className="text-primary relative inline-block">
              Your Home
              <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/30 -z-10 rounded-full" />
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body text-muted-foreground max-w-2xl mx-auto font-medium"
          >
            Every step is carefully managed to deliver fresh pesticide-free produce.
          </motion.p>
        </div>

        <div className="relative mt-12 md:mt-20">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-border z-0" />
          <motion.div 
            className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary to-accent origin-left z-0" 
            style={{ scaleX: scrollYProgress }}
          />

          {/* Tablet/Mobile Timeline Line */}
          <div className="lg:hidden absolute top-[2.5rem] bottom-[2.5rem] left-[2.5rem] w-[2px] bg-border z-0" />
          <motion.div 
            className="lg:hidden absolute top-[2.5rem] bottom-[2.5rem] left-[2.5rem] w-[2px] bg-gradient-to-b from-primary to-accent origin-top z-0" 
            style={{ scaleY: scrollYProgress }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className="flex flex-row lg:flex-col items-start lg:items-center relative group h-full"
              >
                {/* Icon Container */}
                <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 ease-out group-hover:scale-110 bg-background border-2 border-border shadow-sm group-hover:border-primary group-hover:bg-primary group-hover:shadow-lg">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200, damping: 15 }}
                    className="relative z-10"
                  >
                    {step.icon}
                  </motion.div>
                </div>
                
                {/* Card */}
                <div className="ml-6 lg:ml-0 lg:mt-8 bg-card rounded-2xl p-6 lg:p-5 xl:p-6 w-full flex flex-col lg:text-center transition-all duration-500 border border-border shadow-sm group-hover:-translate-y-2 group-hover:border-primary/50 flex-1 relative overflow-hidden">
                  <h3 className="text-xl lg:text-lg xl:text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
    </section>
  );
}
