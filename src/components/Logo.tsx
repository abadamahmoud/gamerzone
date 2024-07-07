import { Gamepad2, SwitchCamera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { calSans } from "@/app/fonts";

function Logo() {
  return (
    <Link
      href={"/dashboard"}
      className="flex space-x-2"
    >
      <p className={`font-semibold text-xl  ${calSans.className}`}>Gamerzone</p>
      <Gamepad2 className="h-6 w-6 shrink-0 lg:hidden" />
    </Link>
  );
}

export default Logo;
