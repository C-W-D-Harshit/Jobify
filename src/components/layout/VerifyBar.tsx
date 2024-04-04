import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function VerifyBar({ session }: any) {
  return (
    <div className="w-full bg-primary py-2 px-4 flex items-center gap-4 justify-center">
      <p className="text-white">Please verify your email</p>
      <Link href={`/auth/verify?email=${session?.user.email}`}>
        <Button variant={"outline"}>Verify</Button>
      </Link>
    </div>
  );
}
