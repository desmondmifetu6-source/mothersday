"use client";

import TributeCard from "./TributeCard";
import { motion } from "framer-motion";

const placeholderTributes = [
  {
    id: 1,
    name: "To My Beautiful Mom",
    quote: "A mother is she who can take the place of all others but whose place no one else can take. Thank you for everything.",
    author: "Desmond Mifetu",
    image: "/moms/mom-1.jpeg"
  },
  {
    id: 2,
    name: "To My Beautiful Mom",
    quote: "There is no role in life more essential and more eternal than that of a mother’s unconditional love.",
    author: "Desmond Mifetu",
    image: "/moms/mom-2.jpeg"
  },
  {
    id: 3,
    name: "To My Beautiful Mom",
    quote: "The heart of a mother is a deep abyss at the bottom of which you will always find forgiveness and grace.",
    author: "Desmond Mifetu",
    image: "/moms/mom-3.jpeg"
  }
];

import { useModals } from "@/context/ModalContext";

export default function FeaturedTributes() {
  const { setIsReelsOpen } = useModals();

  return (
    <section id="tributes" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-text mb-4">Recent Tributes</h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Discover the beautiful stories and memories shared by our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderTributes.map((tribute, index) => (
            <TributeCard 
              key={tribute.id}
              {...tribute}
              delay={index * 0.2}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => setIsReelsOpen(true)}
            className="text-primary font-medium hover:text-secondary transition-colors inline-flex items-center gap-2"
          >
            View All Tributes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
