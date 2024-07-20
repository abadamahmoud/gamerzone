"use client";

import { cn } from "@/lib/utils";
import type { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import UserAvatar from "./UserAvatar";

function ProfileLink({ user }: { user: User }) {
  const pathname = usePathname();

  const href = `/${user.username}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      
    >
      <UserAvatar
        user={user}
        className={`h-10 w-10  ${isActive && "border-2 dark:border-white  border-black"}`}
      />

    </Link>
  );
}

export default ProfileLink;
