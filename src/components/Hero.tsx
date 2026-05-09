"use client";

import { motion } from "framer-motion";
import { useModals } from "@/context/ModalContext";

export default function Hero() {
  const { setIsReelsOpen, setIsPostModalOpen } = useModals();

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-32 pb-20 lg:pt-20 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,182,193,0.15),transparent),radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.1),transparent)]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm tracking-wide uppercase"
            >
              Happy Mother's Day 2024
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black font-heading text-text leading-[1.1] mb-8 tracking-tight">
              Honoring the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-rose-500 to-secondary animate-gradient-x">Queen of Your Heart</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-light mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium opacity-90">
              Create a permanent digital tribute for the woman who gave you everything. Share her story, photos, and your love with the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button 
                onClick={() => setIsPostModalOpen(true)}
                className="group relative overflow-hidden bg-text text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary/40 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Post a Tribute <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button 
                onClick={() => setIsReelsOpen(true)}
                className="bg-white/80 backdrop-blur-md text-text px-10 py-5 rounded-2xl font-bold text-lg border border-gray-200 hover:border-primary/30 hover:bg-white transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                View Tributes
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-text-light/60">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`/moms/mom-${(i % 3) + 1}.jpeg`} className="w-full h-full object-cover" alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold tracking-wide">Joined by 2,400+ children today</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative h-[500px] lg:h-[700px] w-full flex items-center justify-center"
          >
            {/* Main Premium Card */}
            <motion.div 
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.05, zIndex: 50 }}
              className="relative w-80 lg:w-96 aspect-[3/4] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] p-5 border border-white cursor-grab active:cursor-grabbing transform -rotate-2"
            >
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative group">
                <img src="/moms/mom-1.jpeg" alt="Mother" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">Beautiful Soul</p>
                  <p className="text-xl font-heading font-bold leading-tight">"A mother is she who can take the place of all others."</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Accents */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [5, 8, 5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 w-48 aspect-[4/5] bg-white rounded-3xl shadow-2xl p-3 border border-white hidden md:block"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img src="/moms/mom-2.jpeg" alt="Mother" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [-5, -8, -5] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-4 w-48 aspect-[4/5] bg-white rounded-3xl shadow-2xl p-3 border border-white hidden md:block"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img src="/moms/mom-3.jpeg" alt="Mother" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
