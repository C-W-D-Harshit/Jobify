"use client";

import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchComp() {
  return (
    <div className="bg-primary py-6">
      <MaxWidthWrapper>
        <div className="flex items-center gap-6">
          <div className="flex flex-grow items-center gap-3">
            <div className="w-10 min-w-10 h-10 border border-neutral-700 flex justify-center items-center text-white rounded-full text-xl p-1">
              <BsSearch />
            </div>
            <input
              type="text"
              placeholder="Search for jobs..."
              className="text-white"
            />
          </div>
          <Separator orientation="vertical" className="bg-neutral-700 h-16" />
          <div className="flex flex-grow items-center gap-3">
            <div className="w-10 min-w-10 h-10 border border-neutral-700 flex justify-center items-center text-white rounded-full text-xl p-1">
              <MdOutlineLocationOn />
            </div>
            <input
              type="text"
              placeholder="Work location"
              className="text-white"
            />
          </div>
          <Separator orientation="vertical" className="bg-neutral-700 h-16" />
          <div className="flex flex-grow items-center gap-3">
            <div className="w-10 min-w-10 h-10 border border-neutral-700 flex justify-center items-center text-white rounded-full text-xl p-1">
              <IoBagOutline />
            </div>
            <Select>
              <SelectTrigger className="w-[160px] text-white bg-primary border-none text-base">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent className="bg-primary text-white">
                <SelectItem value="light" className="">
                  Light
                </SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator orientation="vertical" className="bg-neutral-700 h-16" />
          <div className="flex flex-grow items-center gap-3">
            <div className="w-10 min-w-10 h-10 border border-neutral-700 flex justify-center items-center text-white rounded-full text-xl p-1">
              <MdOutlineLocationOn />
            </div>
            <Select>
              <SelectTrigger className="w-[160px] text-white bg-primary border-none text-base">
                <SelectValue placeholder="Per month" />
              </SelectTrigger>
              <SelectContent className="bg-primary text-white">
                <SelectItem value="light" className="">
                  Light
                </SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator orientation="vertical" className="bg-neutral-700 h-16" />
          <div className="flex flex-grow items-center gap-3">
            <div className="w-10 min-w-10 h-10 border border-neutral-700 flex justify-center items-center text-white rounded-full text-xl p-1">
              <MdOutlineLocationOn />
            </div>
            <input
              type="text"
              placeholder="Start typing your job search request"
              className="text-white"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
