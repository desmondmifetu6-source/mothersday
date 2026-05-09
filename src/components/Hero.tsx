"use client";

import { motion } from "framer-motion";
import { useModals } from "@/context/ModalContext";

export default function Hero() {
  const { setIsReelsOpen, setIsPostModalOpen } = useModals();

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-background via-white to-primary/10">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-text leading-tight mb-6">
              Celebrate the <br />
              <span className="gradient-text">Woman Who Raised You</span>
            </h1>
            <p className="text-lg md:text-xl text-text-light mb-8 max-w-xl leading-relaxed">
              Share your mother’s photo and message with the world this Mother’s Day. A permanent, beautiful place to say thank you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsPostModalOpen(true)}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all transform hover:-translate-y-1"
              >
                Post a Tribute
              </button>
              <button 
                onClick={() => setIsReelsOpen(true)}
                className="bg-white text-text px-8 py-4 rounded-full font-semibold border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                View Tributes
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[450px] lg:h-[600px] w-full mt-12 lg:mt-0 block"
          >
            {/* Mockup Cards */}
            <motion.div 
              drag
              whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-0 right-4 lg:top-10 lg:right-20 w-64 lg:w-72 bg-white rounded-2xl shadow-2xl p-4 rotate-6 border border-white cursor-grab"
            >
              <div className="w-full h-56 lg:h-64 bg-gray-200 rounded-xl overflow-hidden mb-4 pointer-events-none relative">
                <img src="/moms/mom-1.jpeg" alt="Mother" className="object-cover w-full h-full" />
              </div>
              <p className="font-heading font-medium text-text text-base lg:text-lg select-none">"A mother is she who can take the place of all others."</p>
              <p className="text-sm text-text-light mt-2 select-none">— Desmond</p>
            </motion.div>

            <motion.div 
              drag
              whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-32 left-4 lg:top-40 lg:left-10 w-64 lg:w-72 bg-white rounded-2xl shadow-xl p-4 -rotate-3 border border-white cursor-grab"
            >
              <div className="w-full h-56 lg:h-64 bg-gray-200 rounded-xl overflow-hidden mb-4 pointer-events-none relative">
                <img src="/moms/mom-2.jpeg" alt="Mother" className="object-cover w-full h-full" />
              </div>
              <p className="font-heading font-medium text-text text-base lg:text-lg select-none">"Everything I am, I owe to my angel mother."</p>
              <p className="text-sm text-text-light mt-2 select-none">— Desmond</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
    </>
  );
}
