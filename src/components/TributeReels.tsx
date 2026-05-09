"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, X } from "lucide-react";
import { useState } from "react";

export type CommentType = { name: string; text: string };
export type TributeType = {
  id: number;
  image: string;
  name: string;
  quote: string;
  initialLikes: number;
  initialComments: CommentType[];
};

export default function TributeReels({ 
  isOpen, 
  onClose,
  tributes 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  tributes: TributeType[];
}) {
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
  const [newComment, setNewComment] = useState("");
  const [commentsState, setCommentsState] = useState<{ [key: number]: CommentType[] }>({});
  
  if (!isOpen) return null;

  const toggleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = (id: number) => {
    if (!newComment.trim()) return;
    const currentComments = commentsState[id] || tributes.find(t => t.id === id)?.initialComments || [];
    setCommentsState(prev => ({
      ...prev,
      [id]: [...currentComments, { name: "Guest User", text: newComment }]
    }));
    setNewComment("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-black text-white overflow-hidden flex flex-col"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-[110] p-3 bg-black/50 hover:bg-black/80 rounded-full transition-colors backdrop-blur-md">
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable Container */}
        <div className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {tributes.map((tribute) => {
            const currentComments = commentsState[tribute.id] || tribute.initialComments;
            const currentLikes = tribute.initialLikes + (likes[tribute.id] ? 1 : 0);

            return (
              <div key={tribute.id} className="h-[100dvh] w-full relative snap-start bg-black flex items-center justify-center">
                <img src={tribute.image} alt="Mom" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 pb-12 w-full pr-24">
                  <h2 className="text-2xl font-bold mb-3 drop-shadow-md">@{tribute.name}</h2>
                  <p className="text-lg drop-shadow-md">{tribute.quote}</p>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-12 right-4 flex flex-col gap-6 items-center z-[105]">
                  <button onClick={() => toggleLike(tribute.id)} className="flex flex-col items-center gap-1 group outline-none">
                    <div className="p-3 bg-black/40 backdrop-blur-md rounded-full group-active:scale-90 transition-transform">
                      <Heart className={`w-8 h-8 transition-colors ${likes[tribute.id] ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </div>
                    <span className="text-sm font-bold drop-shadow-md">{currentLikes}</span>
                  </button>
                  <button onClick={() => setShowComments(prev => ({ ...prev, [tribute.id]: !prev[tribute.id] }))} className="flex flex-col items-center gap-1 group outline-none">
                    <div className="p-3 bg-black/40 backdrop-blur-md rounded-full group-active:scale-90 transition-transform">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-sm font-bold drop-shadow-md">{currentComments.length}</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                    className="flex flex-col items-center gap-1 group outline-none"
                  >
                    <div className="p-3 bg-black/40 backdrop-blur-md rounded-full group-active:scale-90 transition-transform">
                      <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-sm font-bold drop-shadow-md">Share</span>
                  </button>
                </div>

                {/* Fake Comment Modal Overlay */}
                <AnimatePresence>
                  {showComments[tribute.id] && (
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="absolute bottom-0 left-0 w-full h-[65vh] bg-white text-black rounded-t-[32px] p-6 pb-8 flex flex-col z-[120] shadow-2xl"
                    >
                      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl">Comments ({currentComments.length})</h3>
                        <button onClick={() => setShowComments(prev => ({ ...prev, [tribute.id]: false }))}>
                          <X className="w-6 h-6 text-gray-500 hover:text-black" />
                        </button>
                      </div>
                      
                      <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                        {currentComments.length === 0 && (
                          <p className="text-center text-gray-500 mt-10">No comments yet. Be the first to comment!</p>
                        )}
                        {currentComments.map((comment, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex-shrink-0" />
                            <div>
                              <p className="font-bold text-sm text-gray-900">{comment.name}</p>
                              <p className="text-gray-700 mt-1">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t flex gap-3 relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                        <input 
                          type="text" 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment(tribute.id)}
                          placeholder="Add a beautiful comment..." 
                          className="flex-grow bg-gray-100 rounded-full px-5 py-3 outline-none text-sm border border-transparent focus:border-gray-300 transition-colors" 
                        />
                        <button 
                          onClick={() => handleAddComment(tribute.id)}
                          className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary/90 transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
