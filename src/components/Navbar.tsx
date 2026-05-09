"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useModals } from "@/context/ModalContext";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setIsPostModalOpen } = useModals();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${
        scrolled ? "py-4 bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-b border-white/20" : "py-6 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Heart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-primary blur-md -z-10"
              />
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter text-text group-hover:text-primary transition-colors duration-300">
              Mother's <span className="text-primary">Wall</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-text-light hover:text-text transition-colors font-bold text-sm uppercase tracking-widest">Home</Link>
            <Link href="#tributes" className="text-text-light hover:text-text transition-colors font-bold text-sm uppercase tracking-widest">Tributes</Link>
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-text text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Post Your Mom
            </button>
          </div>

          <div className="md:hidden flex items-center">
             <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-text text-white p-3 rounded-2xl shadow-xl active:scale-90"
            >
              <Heart className="w-6 h-6" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
