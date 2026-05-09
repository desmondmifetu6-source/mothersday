"use client";

import { motion } from "framer-motion";
import { UploadCloud, PenTool, Share2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8 text-primary" />,
      title: "Upload a Photo",
      desc: "Choose a beautiful picture of your mother that captures her spirit."
    },
    {
      icon: <PenTool className="w-8 h-8 text-primary" />,
      title: "Write a Message",
      desc: "Share a heartfelt memory, quote, or simply say thank you."
    },
    {
      icon: <Share2 className="w-8 h-8 text-primary" />,
      title: "Share with the World",
      desc: "Publish your tribute to our public wall and share it with family."
    }
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-text mb-4">How It Works</h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Creating a tribute is simple, elegant, and completely free.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center max-w-sm"
            >
              <div className="w-24 h-24 rounded-full bg-white shadow-lg shadow-primary/5 flex items-center justify-center mb-6 relative z-10">
                {step.icon}
                <div className="absolute -inset-2 rounded-full border border-primary/20 scale-100 opacity-50" />
              </div>
              <h3 className="text-2xl font-semibold font-heading text-text mb-3">Step {index + 1}: {step.title}</h3>
              <p className="text-text-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
