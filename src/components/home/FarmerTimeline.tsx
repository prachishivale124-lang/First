"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sprout, CheckCircle2, PackageCheck, Home } from "lucide-react";

export function FarmerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const steps = [
    {
      title: "Farmer Direct Supply",
      description: "Direct partnership with local farmers to ensure fair trade and fresh produce.",
      icon: <Sprout className="w-8 h-8" />,
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Fresh Picking Process",
      description: "Produce is hand-picked at peak ripeness for maximum flavor and nutrition.",
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: "bg-green-600 text-white",
    },
    {
      title: "Quality Checking Process",
      description: "Rigorous testing for pesticide residue and overall quality standards.",
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: "bg-gold text-white",
    },
    {
      title: "Safe Packaging",
      description: "Eco-friendly, safe packaging to preserve freshness during transit.",
      icon: <PackageCheck className="w-8 h-8" />,
      color: "bg-accent text-white",
    },
    {
      title: "Home Delivery From Farm To Customer",
      description: "Swift, temperature-controlled delivery directly to your doorstep.",
      icon: <Home className="w-8 h-8" />,
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={containerRef} id="process">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            From Farm To <span className="text-primary">Your Home</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Our transparent and swift supply chain ensures that you get the freshest produce possible.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto mt-20">
          {/* Animated Line connecting steps */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border/50 -translate-y-1/2 z-0" />
          <motion.div 
            className="hidden md:block absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 origin-left" 
            style={{ scaleX: scrollYProgress }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  {/* Vertical line for mobile */}
                  {index !== steps.length - 1 && (
                    <div className="md:hidden absolute top-24 left-1/2 w-0.5 h-20 bg-border/50 -translate-x-1/2 z-0" />
                  )}

                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl ${step.color} transform group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-background`}>
                    {step.icon}
                  </div>
                  
                  <div className={`md:absolute md:w-48 ${isEven ? 'md:top-28' : 'md:-top-32'} flex flex-col items-center`}>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwbDhfOHptOCAwTDBfOHoiIHN0cm9rZT0iIzJBNTk0MSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
    </section>
  );
}
