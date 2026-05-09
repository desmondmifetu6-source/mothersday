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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="font-heading font-bold text-xl tracking-tight text-text">
              Mother's Day Wall
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-light hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="#tributes" className="text-text-light hover:text-primary transition-colors font-medium">Tributes</Link>
            <Link href="#about" className="text-text-light hover:text-primary transition-colors font-medium">About</Link>
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-full font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
            >
              Post Your Mom
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
