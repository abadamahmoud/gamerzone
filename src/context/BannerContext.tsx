// context/BannerContext.tsx
'use client'; // Ensure this is a client-side component

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface BannerContextType {
  isBannerVisible: boolean;
  closeBanner: () => void;
}

// Create context with a default value (you can use `null` and handle it in the provider)
const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const bannerClosed = localStorage.getItem('bannerClosed') === 'true';
    setIsBannerVisible(!bannerClosed);
  }, []);

  const closeBanner = () => {
    setIsBannerVisible(false);
    localStorage.setItem('bannerClosed', 'true');
  };

  return (
    <BannerContext.Provider value={{ isBannerVisible, closeBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

// Custom hook to use banner context
export const useBannerContext = (): BannerContextType => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBannerContext must be used within a BannerProvider');
  }
  return context;
};
