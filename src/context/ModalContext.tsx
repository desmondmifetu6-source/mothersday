"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { TributeType } from "@/components/TributeReels";

type ModalContextType = {
  isReelsOpen: boolean;
  setIsReelsOpen: (open: boolean) => void;
  isPostModalOpen: boolean;
  setIsPostModalOpen: (open: boolean) => void;
  tributes: TributeType[];
  addTribute: (tribute: TributeType) => void;
};

const initialTributes: TributeType[] = [
  { id: 1, image: "/moms/mom-1.jpeg", name: "Desmond", quote: "A mother is she who can take the place of all others but whose place no one else can take.", initialLikes: 2400, initialComments: [] },
  { id: 2, image: "/moms/mom-2.jpeg", name: "Desmond", quote: "Everything I am, or ever hope to be, I owe to my angel mother.", initialLikes: 1800, initialComments: [] },
  { id: 3, image: "/moms/mom-3.jpeg", name: "Desmond", quote: "To the world you are a mother, but to our family you are the absolute world.", initialLikes: 3200, initialComments: [] },
  { id: 4, image: "/moms/mom-1.jpeg", name: "Desmond", quote: "Thank you for all the sacrifices seen and unseen.", initialLikes: 1200, initialComments: [] },
  { id: 5, image: "/moms/mom-2.jpeg", name: "Desmond", quote: "Your love is my guiding light.", initialLikes: 950, initialComments: [] },
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
