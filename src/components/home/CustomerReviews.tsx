"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function CustomerReviews() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Regular Customer",
      content: "The vegetables are always fresh and delivered on time. The quality is unmatched compared to local markets.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Home Chef",
      content: "I love the organic fruits from Bhishma. The direct-from-farmer approach really shows in the taste!",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      role: "Health Enthusiast",
      content: "Best place to buy pesticide-free veggies. The packaging is eco-friendly and safe.",
      rating: 4,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Customer <span className="text-primary">Reviews</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            See what our happy customers have to say about our fresh produce.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card p-8 rounded-2xl border border-border/50 soft-shadow"
            >
              <div className="flex text-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < review.rating ? "fill-current" : "opacity-30"}`} />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{review.content}"</p>
              <div>
                <h4 className="font-bold text-foreground">{review.name}</h4>
                <p className="text-sm text-primary">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
