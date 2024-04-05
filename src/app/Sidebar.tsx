import HomeCard from "@/components/card/HomeCard";
import React from "react";
import FilterComp from "./FilterComp";

export default function Sidebar() {
  return (
    <div className="w-72 h-full flex flex-col gap-8">
      <HomeCard />
      <FilterComp />
    </div>
  );
}
