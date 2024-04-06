"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoPersonOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function UserAvatar() {
  const { data: session }: { data: any } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    signOut({
      redirect: false,
    });
    router.push("/");
  };

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/feature?feature=applied-jobs"}>Applied Jobs</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/feature?feature=saved-jobs"}>Saved Jobs</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/my-jobs"}>My Jobs</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant={"destructive"}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href={"/auth/login"}>
      <Button size={"icon"} className="rounded-full border-neutral-700 border">
        <IoPersonOutline className="text-xl" />
      </Button>
    </Link>
  );
}
