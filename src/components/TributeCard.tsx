"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TributeCardProps {
  image: string;
  name: string;
  quote: string;
  author: string;
  delay?: number;
}

export default function TributeCard({ image, name, quote, author, delay = 0 }: TributeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 group"
    >
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Heart className="text-white/80 w-6 h-6 ml-auto" fill="currentColor" />
        </div>
      </div>
      <div className="px-2">
        <h3 className="font-heading font-semibold text-xl text-text mb-1">{name}</h3>
        <p className="text-text-light text-sm italic mb-4">"{quote}"</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
            {author.charAt(0)}
          </div>
          <p className="text-sm font-medium text-text-light">By {author}</p>
        </div>
      </div>
    </motion.div>
  );
}
