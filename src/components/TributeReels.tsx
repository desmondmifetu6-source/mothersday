"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle, Share2, Music2 } from "lucide-react";
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Top Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-[320] flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-white font-black tracking-tight text-lg block leading-none">Tribute Reels</span>
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 block">Live Feed</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full transition-all active:scale-90 border border-white/10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Reels Container */}
        <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {tributes.map((tribute) => {
            const currentLikes = tribute.initialLikes + (likes[tribute.id] ? 1 : 0);
            const currentComments = commentsState[tribute.id] || tribute.initialComments;
            const liked = likes[tribute.id];

            return (
              <div key={tribute.id} className="relative w-full h-full snap-start flex flex-col items-center justify-center bg-black">
                {/* Background Image (Blurred for ambiance) */}
                <img 
                  src={tribute.image} 
                  alt={tribute.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-2xl scale-110"
                />
                
                {/* Immersive Mobile Content Container */}
                <div className="relative w-full h-full max-w-[500px] mx-auto flex flex-col">
                  {/* Main Clear Image */}
                  <div className="absolute inset-0 z-0 sm:inset-4 sm:rounded-[2rem] overflow-hidden">
                    <img 
                      src={tribute.image} 
                      alt={tribute.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                  </div>

                  {/* Interaction Buttons (Sidebar Style) */}
                  <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-6">
                    {/* Like */}
                    <button 
                      onClick={() => toggleLike(tribute.id)} 
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <motion.div 
                        whileTap={{ scale: 1.5 }}
                        className={`p-4 rounded-full backdrop-blur-2xl transition-all border ${liked ? "bg-primary border-primary shadow-[0_0_30px_rgba(255,107,107,0.4)]" : "bg-black/40 border-white/10 hover:bg-black/60"}`}
                      >
                        <Heart className={`w-8 h-8 ${liked ? "text-white fill-white" : "text-white"}`} />
                      </motion.div>
                      <span className="text-white text-xs font-black drop-shadow-lg tracking-tighter">{(currentLikes/1000).toFixed(1)}K</span>
                    </button>

                    {/* Comment */}
                    <button 
                      onClick={() => setShowComments(prev => ({ ...prev, [tribute.id]: true }))} 
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div className="p-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full hover:bg-black/60 transition-all">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-white text-xs font-black drop-shadow-lg tracking-tighter">{currentComments.length}</span>
                    </button>

                    {/* Share */}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied! Share the love ❤️");
                      }}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div className="p-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full hover:bg-black/60 transition-all">
                        <Share2 className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-white text-[10px] font-black drop-shadow-lg uppercase tracking-widest text-center">Share</span>
                    </button>

                    {/* Spinning Music Vinyl (Decorative) */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full border-2 border-white/20 p-1 mt-4 shadow-2xl"
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-gray-900 via-black to-gray-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Caption & Info (Bottom Left) */}
                  <div className="absolute left-6 bottom-10 right-24 z-20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-rose-500 border-2 border-white shadow-xl flex items-center justify-center font-black text-white text-xl">
                        {tribute.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-black text-lg drop-shadow-2xl">@{tribute.name.toLowerCase().replace(/ /g, '')}</p>
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Verified Contributor</p>
                      </div>
                    </div>
                    <p className="text-white text-xl font-bold leading-snug drop-shadow-2xl line-clamp-4 mb-4">
                      "{tribute.quote}"
                    </p>
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
                      <Music2 className="w-4 h-4 text-white" />
                      <div className="overflow-hidden w-32">
                        <motion.p 
                          animate={{ x: [0, -100] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="text-white font-bold text-xs whitespace-nowrap"
                        >
                          Dear Mama - 2Pac • Original Audio • Dear Mama - 2Pac • Original Audio
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Bottom Sheet Overlay */}
                <AnimatePresence>
                  {showComments[tribute.id] && (
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      className="absolute inset-0 z-[350] flex flex-col justify-end"
                    >
                      <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowComments(prev => ({ ...prev, [tribute.id]: false }))}
                      />
                      <div className="relative bg-white w-full max-w-lg mx-auto h-[75vh] rounded-t-[3rem] flex flex-col overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.5)]">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full mx-auto my-5" />
                        <div className="flex justify-between items-center px-10 py-2 border-b border-gray-50">
                          <div>
                            <h3 className="font-black text-2xl tracking-tighter text-text">Tribute Love</h3>
                            <p className="text-text-light/50 text-[10px] font-black uppercase tracking-widest">{currentComments.length} Beautiful Messages</p>
                          </div>
                          <button 
                            onClick={() => setShowComments(prev => ({ ...prev, [tribute.id]: false }))} 
                            className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
                          >
                            <X className="w-6 h-6 text-gray-400" />
                          </button>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto px-10 py-8 space-y-8">
                          {currentComments.map((comment, idx) => (
                            <div key={idx} className="flex gap-4 group">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/10 to-secondary/10 flex-shrink-0 flex items-center justify-center font-black text-primary text-xl">
                                {comment.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-black text-sm text-text">{comment.name}</p>
                                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                                  <span className="text-[10px] font-bold text-gray-400 uppercase">Just now</span>
                                </div>
                                <p className="text-text-light text-[15px] font-medium leading-relaxed bg-gray-50 rounded-2xl p-4 group-hover:bg-gray-100 transition-colors">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-10 pt-4 border-t bg-white flex gap-3 items-center">
                          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex-shrink-0 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-gray-300" />
                          </div>
                          <div className="relative flex-grow">
                            <input 
                              type="text" 
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(tribute.id)}
                              placeholder="Write something sweet..." 
                              className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold text-text placeholder:text-gray-300 focus:border-primary transition-all pr-20" 
                            />
                            <button 
                              onClick={() => handleAddComment(tribute.id)}
                              disabled={!newComment.trim()}
                              className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-black text-sm transition-all ${
                                newComment.trim() ? "bg-text text-white shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              Send
                            </button>
                          </div>
                        </div>
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
