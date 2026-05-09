"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import TributeReels, { TributeType } from "@/components/TributeReels";
import PostTributeModal from "@/components/PostTributeModal";

type ModalContextType = {
  isReelsOpen: boolean;
  setIsReelsOpen: (open: boolean) => void;
  isPostModalOpen: boolean;
  setIsPostModalOpen: (open: boolean) => void;
  tributes: TributeType[];
  addTribute: (tribute: TributeType) => void;
};

const initialTributes: TributeType[] = [
  { 
    id: 1, 
    image: "/moms/mom-1.jpeg", 
    name: "Desmond", 
    quote: "A mother is she who can take the place of all others but whose place no one else can take.", 
    initialLikes: 2450, 
    initialComments: [{ name: "Grace", text: "This is so beautiful!" }, { name: "Samuel", text: "Happy Mother's Day!" }] 
  },
  { 
    id: 2, 
    image: "/moms/mom-2.jpeg", 
    name: "Desmond", 
    quote: "There is no role in life more essential and more eternal than that of a mother’s unconditional love.", 
    initialLikes: 1820, 
    initialComments: [{ name: "Linda", text: "What a stunning photo." }] 
  },
  { 
    id: 3, 
    image: "/moms/mom-3.jpeg", 
    name: "Desmond", 
    quote: "The heart of a mother is a deep abyss at the bottom of which you will always find forgiveness and grace.", 
    initialLikes: 3100, 
    initialComments: [] 
  },
];

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isReelsOpen, setIsReelsOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [tributes, setTributes] = useState<TributeType[]>(initialTributes);

  const addTribute = (newTribute: TributeType) => {
    setTributes((prev) => [newTribute, ...prev]);
  };

  return (
    <ModalContext.Provider
      value={{
        isReelsOpen,
        setIsReelsOpen,
        isPostModalOpen,
        setIsPostModalOpen,
        tributes,
        addTribute,
      }}
    >
      {children}
      
      {/* Global Modals rendered here for maximum reliability */}
      <TributeReels 
        isOpen={isReelsOpen} 
        onClose={() => setIsReelsOpen(false)} 
        tributes={tributes} 
      />
      
      {isPostModalOpen && (
        <PostTributeModal 
          isOpen={isPostModalOpen} 
          onClose={() => setIsPostModalOpen(false)} 
          onPost={addTribute} 
        />
      )}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
