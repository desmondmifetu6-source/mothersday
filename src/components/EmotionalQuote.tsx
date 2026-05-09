"use client";

import { motion } from "framer-motion";

export default function EmotionalQuote() {
  return (
    <section className="py-32 bg-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-white to-white" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-primary text-6xl font-serif block mb-4">"</span>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-text leading-tight mb-8">
            A mother’s love deserves to be remembered publicly.
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
