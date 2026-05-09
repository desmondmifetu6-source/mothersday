"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon, Camera, Heart } from "lucide-react";
import { useState, useRef } from "react";
import { TributeType } from "./TributeReels";

export default function PostTributeModal({ 
  isOpen, 
  onClose,
  onPost
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onPost: (tribute: TributeType) => void;
}) {
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!name || !quote || !image) return;
    
    const newTribute: TributeType = {
      id: Date.now(),
      image,
      name,
      quote,
      initialLikes: 0,
      initialComments: [],
    };
    
    onPost(newTribute);
    setName("");
    setQuote("");
    setImage(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        {/* Modal Container */}
        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0.5 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative bg-white w-full max-w-xl rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
            <div>
              <h2 className="text-2xl font-black font-heading text-text tracking-tight flex items-center gap-2">
                Celebrate Mom <Heart className="w-5 h-5 text-primary fill-primary" />
              </h2>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mt-0.5">Permanent Digital Tribute</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-text rounded-full transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto space-y-8">
            {/* Image Upload Area */}
            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-wider text-text-light/60">Step 1: Choose a Photo</label>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-[4/3] rounded-[2rem] border-4 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group ${
                  image ? "border-primary" : "border-gray-100 bg-gray-50 hover:bg-gray-100/50 hover:border-primary/30"
                }`}
              >
                {image ? (
                  <>
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="text-center px-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-lg font-bold text-text mb-1">Pick her best photo</p>
                    <p className="text-sm text-text-light font-medium">From your gallery or camera roll</p>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </motion.div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold uppercase tracking-wider text-text-light/60">Step 2: Her Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Martha Mifetu"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl px-6 py-4 outline-none font-bold text-text placeholder:text-gray-300 transition-all text-lg shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold uppercase tracking-wider text-text-light/60">Step 3: A Message of Love</label>
                <textarea 
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="What makes her special to you?"
                  rows={4}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl px-6 py-4 outline-none font-medium text-text placeholder:text-gray-300 transition-all text-lg resize-none shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-8 pt-4">
            <button 
              onClick={handlePost}
              disabled={!name || !quote || !image}
              className={`w-full py-5 rounded-[1.5rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 transform active:scale-95 ${
                name && quote && image 
                ? "bg-text text-white hover:bg-black hover:shadow-primary/30" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Upload className="w-6 h-6" />
              Publish Tribute
            </button>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] font-black text-text-light/30 mt-6">
              This tribute is permanent and will be seen by everyone
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
