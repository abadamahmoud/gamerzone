// components/SideNav.js
'use client';

import { useBannerContext } from '../context/BannerContext';
import NavLinks from "./NavLinks";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const { isBannerVisible } = useBannerContext();
  const marginClass = isBannerVisible ? 'md:pt-32' : 'md:pt-20';
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register" || pathname === "/contact" || pathname === "/help" || pathname === "/feedback" || pathname === "/communities" || pathname === "/legal/terms" || pathname === "/legal/privacy") return;


  return (
    <nav className="flex fixed bottom-0 z-[500] !bg-white dark:!bg-neutral-950 w-full md:relative md:w-auto md:h-full flex-col lg:w-52 md:border-r px-3 py-4 md:px-2">
      <div className={`border-t -ml-3 md:ml-0 ${marginClass} md:pt-20 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2`}>
        <NavLinks />
        
        <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
          <Footer />
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
