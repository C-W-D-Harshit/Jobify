import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Landing() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow flex flex-col justify-end items-center pb-24">
        <div className="w-72 h-72 relative">
          <Image
            src={"/assets/logo.png"}
            fill
            alt="logo"
            className="object-contain drop-shadow-lg rounded-md"
          />
        </div>
      </div>
      <div className="mb-40">
        <Link href={"/auth/login?step=2"}>
          <Button className="w-full mb-3 text-lg h-12" size={"lg"}>
            Login
          </Button>
        </Link>
        <Link href={"/auth/sign-up"}>
          <Button
            variant={"outline"}
            className="w-full text-lg h-12"
            size={"lg"}
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
