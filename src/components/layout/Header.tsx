"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import { Button } from "../ui/button";
import { RiMenu4Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Menu from "./Menu";
import { MdOutlineLocationOn } from "react-icons/md";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
import { GoGear } from "react-icons/go";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [whatOpen, setWhatOpen] = useState<string>("");

  return (
    <>
      <div className="py-1.5 border-b border-neutral-700 bg-primary">
        <MaxWidthWrapper>
          <div className="w-full flex items-center justify-between h-16 text-white">
            <Link href={"/"}>
              <h2 className="min-w-max text-2xl font-semibold">Jobify.</h2>
            </Link>
            <Menu />
            <div className="flex items-center gap-1.5 -mr-5">
              <MdOutlineLocationOn className="text-neutral-400 text-xl" />
              <p>Noida, UP</p>
            </div>
            <div className="flex items-center gap-3">
              <UserAvatar />
              <Link href={""}>
                <Button
                  size={"icon"}
                  className="rounded-full border-neutral-700 border"
                >
                  <FaRegBell className="text-xl" />
                </Button>
              </Link>
              <Link href={""}>
                <Button
                  size={"icon"}
                  className="rounded-full border-neutral-700 border"
                >
                  <GoGear className="text-xl" />
                </Button>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <Sheet
        open={whatOpen === "menu" && isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);

          if (!open) {
            setWhatOpen("");
          } else {
            setWhatOpen("menu");
          }
        }}
      >
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet
        open={whatOpen === "notification" && isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);

          if (!open) {
            setWhatOpen("");
          } else {
            setWhatOpen("notification");
          }
        }}
      >
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
