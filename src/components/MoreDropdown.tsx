"use client";
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronLeft,
  FileQuestion,
  LogOut,
  Mail,
  Menu,
  MessageSquareWarning,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import ProfileLink from "./ProfileLink";

function MoreDropdown() {
  const {user} = useUser();
  const [showModeToggle, setShowModeToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Close the dropdown when the user clicks outside
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          variant={"ghost"}
          size={"lg"}
          className="md:flex lg:hidden !justify-start space-x-2 !px-3"
        >
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn(
          "dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity",
          !open && "opacity-0"
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
          {user? <>
          <Link href={`/${user.username}`}>
          <DropdownMenuItem className="dark:hover:bg-[#3C3C3C] !cursor-pointer flex items-center gap-x-2 !py-1.5 !m-1.5 !mt-3 !rounded-lg font-medium">
          <ProfileLink user={user} />
            {user.name}
            </DropdownMenuItem>
          </Link>
            <DropdownMenuItem className="menuItem" onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
              
              <LogOut size={20} />
              <p>Log out</p>
            </DropdownMenuItem>
            </> : <>
            <Link href={"/login"}>
            <DropdownMenuItem >
            <Button  variant={"ghost"} className="flex w-full mt-2 py-3 dark:hover:bg-neutral-700 h-full hover:bg-neutral-200 space-x-2">
            
            Login
          </Button>
              </DropdownMenuItem>
            </Link> 
            <Link href={"/register"}>
            <DropdownMenuItem>
            <Button  variant={"default"} className="flex w-full selection:h-full  space-x-2">
              
              Register
            </Button>
              </DropdownMenuItem>
            </Link> </>}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="menuItem"
              onClick={() => setShowModeToggle(true)}
            >
              <Moon size={20} />
              <p>Switch appearance</p>
            </DropdownMenuItem>

            {/*<DropdownMenuItem className="menuItem">
              <Bell size={20} />
              <p>Notifications</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Settings size={20} />
              <p>Settings</p>
            </DropdownMenuItem>*/}
            <DropdownMenuSeparator />
           <Link href={"/contact"} rel="noopener noreferrer" target="_blank" >
            <DropdownMenuItem className="menuItem">
                <Mail size={20} />
                <p>Business Contact</p>
              </DropdownMenuItem> 
            </Link>
           <Link href={"/feedback"} rel="noopener noreferrer" target="_blank" >
            <DropdownMenuItem className="menuItem">
                <MessageSquareWarning size={20} />
                <p>Feedback</p>
              </DropdownMenuItem> 
            </Link>
           <Link href={"/help"} rel="noopener noreferrer" target="_blank" >
              <DropdownMenuItem className="menuItem">
                <FileQuestion size={20} />
                <p>Help</p>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={"/legal/terms"} rel="noopener noreferrer" target="_blank" >
              <DropdownMenuItem className="menuItem">
                <p>Terms of Use</p>
              </DropdownMenuItem>
            </Link>
           <Link href={"/legal/privacy"} rel="noopener noreferrer" target="_blank" >
            <DropdownMenuItem className="menuItem">
                <p>Privacy Policy</p>
              </DropdownMenuItem>
            </Link> 

          </>
        )}

        {showModeToggle && (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
              <ChevronLeft size={18} onClick={() => setShowModeToggle(false)} />
              <p className="font-bold ml-1">Switch appearance</p>
              {theme === "dark" ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>

            <Label htmlFor="dark-mode" className="menuItem">
              Dark Mode
              <DropdownMenuItem className="ml-auto !p-0">
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light");
                  }}
                />
              </DropdownMenuItem>
            </Label>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreDropdown;
