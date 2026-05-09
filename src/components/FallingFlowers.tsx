"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FallingFlowers() {
  const [flowers, setFlowers] = useState<{ id: number; left: number; delay: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random flowers
    const newFlowers = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 15 + 15,
      duration: Math.random() * 5 + 10,
    }));
    setFlowers(newFlowers);
  }, []);

  if (flowers.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          initial={{ y: -50, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: Math.random() > 0.5 ? 100 : -100,
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            left: `${flower.left}%`,
            fontSize: flower.size,
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}
