"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!name || !quote || !image) return alert("Please fill in all fields and upload a photo.");
    
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
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold font-heading">Post a Tribute</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Desmond"
                className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">A Beautiful Quote</label>
              <textarea 
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Write a message to the woman who raised you..."
                rows={3}
                className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Photo of Mom</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-primary transition-colors overflow-hidden relative"
              >
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-600">Click to choose from gallery</p>
                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG</p>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50">
            <button 
              onClick={handlePost}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Post Tribute
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
