"use client";

import React from "react";
import { Button } from "../ui/button";

export default function HomeCard() {
  return (
    <div className="w-full rounded-xl bg-primary relative flex flex-col items-center justify-center antialiased p-5 py-12 gap-8">
      <h3 className="text-white font-semibold text-3xl">
        Get Your best profession with Jobify
      </h3>
      <Button variant={"secondary"} className="w-full rounded-full">
        Learn More
      </Button>
      {/* <BackgroundBeams /> */}
    </div>
  );
}
