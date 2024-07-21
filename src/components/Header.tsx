import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { calSans } from "@/app/fonts";
import MoreDropdown from "./MoreDropdown";
import TopRightMenu from "./TopRightMenu";
import { Switch } from "./ui/switch";
import ThemeToggle from "./ThemeToggle";


function Header() {

  return (
    <header className="fixed right-0 bg-white top-0 flex items-center justify-between dark:bg-neutral-950 w-full z-50 border-b border-zinc-300 dark:border-neutral-700 px-3 py-2 sm:-ml-6">
      <Link href={"/"}>
        <p className={`font-semibold hidden md:block text-xl ${calSans.className}`}>
          Gamerzone
        </p>
        <p className={`font-semibold block md:hidden text-xl ${calSans.className}`}>
          GG
        </p>
      </Link>
      <div className="flex items-center text-neutral-600 dark:text-neutral-400 bg-zinc-100  md:w-[400px] dark:bg-neutral-800 gap-x-2 rounded-md px-3.5 py-2">
        <Search className="h-5 w-5" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-lg placeholder:text-neutral-600 dark:placeholder:text-neutral-400 flex-1 outline-none"
        />
      </div>
      <div className="flex items-center">

      <ThemeToggle/>
      <TopRightMenu/>
      <MoreDropdown/>
      </div>
    </header>
  );
}

export default Header;
