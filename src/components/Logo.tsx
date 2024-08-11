
import Link from "next/link";

import { calSans, chakraPetch } from "@/app/fonts";


function Logo() {
  return (
    <Link
      href={"/"}
      className="flex space-x-2"
    >
      <p className={`font-semibold text-3xl hidden border-2 dark:border-white border-black hover:dark:bg-neutral-700 hover:bg-neutral-200  rounded-md px-2 lg:flex ${chakraPetch.className}`}>Gamerzone</p>
      <p className={`font-semibold text-3xl border-2 dark:border-white border-black hover:dark:bg-neutral-700 hover:bg-neutral-200 rounded-md px-2 flex lg:hidden  ${chakraPetch.className}`}>G</p>
      
    </Link>
  );
}

export default Logo;
