"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-white to-primary/10 relative overflow-hidden">
      {/* Floating particles background effect */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 blur-xl"
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-text mb-6">
            Make Your Mother <span className="gradient-text">Smile Today</span>
          </h2>
          <p className="text-xl text-text-light mb-10 max-w-2xl mx-auto">
            Create a tribute she will never forget. Join thousands of others honoring the women who raised them.
          </p>
          <button className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-5 rounded-full font-semibold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:-translate-y-1">
            Create Tribute
          </button>
        </motion.div>
      </div>
    </section>
  );
}
