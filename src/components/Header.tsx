'use client';

import { useEffect, useState } from 'react';
import MoreDropdown from "./MoreDropdown";
import TopRightMenu from "./TopRightMenu";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useBannerContext } from '@/context/BannerContext';

function Header() {
  const { isBannerVisible, closeBanner } = useBannerContext();
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register" || pathname === "/contact" || pathname === "/help" || pathname === "/feedback" || pathname === "/communities" || pathname === "/legal/terms" || pathname === "/legal/privacy") return;

  

  return (
    <div className='fixed right-0 top-0 w-full z-[1000]'>
   
      {isBannerVisible && (
        <div className="w-full bg-yellow-300 text-neutral-950 text-sm sm:text-base py-2 px-4  flex items-center justify-between">
          
            <span role="img" aria-label="construction" className="text-xl mr-4">
              🚧
            </span>
            <p className="font-semibold text-center">
              We're Building Something Awesome! Our site is still under development—stay tuned for exciting updates and new features.
            </p>
        
          <button
            onClick={closeBanner}
            className="text-neutral-950 text-xl hover:text-neutral-700 transition-colors duration-300 focus:outline-none ml-4"
          >
            ✕
          </button>
        </div>
      )}
      <header className={`w-full bg-white border-b border-zinc-300 dark:bg-neutral-950 dark:border-neutral-700  flex items-center justify-between px-3 py-2 `}>
        <Logo />
        <div className="flex ml-4 items-center text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-neutral-800 md:w-[400px] gap-x-2 rounded-md px-3.5 py-2">
          <Search className="h-5 w-5" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-lg placeholder:text-neutral-600 dark:placeholder:text-neutral-400 flex-1 outline-none"
          />
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <TopRightMenu />
          <MoreDropdown />
        </div>
      </header>
    </div>
    
  );
}

export default Header;
