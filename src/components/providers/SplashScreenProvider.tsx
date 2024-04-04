"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";

export default function SplashScreenProvider() {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) setTimeout(() => setLoading(false), 1000);
    }
  }, []);
  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col justify-center items-center transition-all duration-1000 bg-white z-50 fixed top-0 left-0 overflow-hidden",
        {
          "-left-full": !loading,
        }
      )}
      id="globalLoader"
    >
      <div className="w-64 h-64 z-50 relative">
        <Image
          src={"/assets/logo.png"}
          className="object-contain mix-blend-screen rounded-md"
          fill
          alt="logo"
          priority
        />
      </div>
    </div>
  );
}
