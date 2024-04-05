"use client";

import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React, { useCallback, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function SearchComp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [range, setRange] = useState([0, 24]);

  const handleRangeChange = (value: any) => {
    setRange(value);
  };

  const salary_gte = searchParams.get("salary_gte") ?? "";
  const salary_lte = searchParams.get("salary_lte") ?? "";

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
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
              onChange={(e) =>
                router.push(
                  `${pathname}?${createQueryString("search", e.target.value)}`
                )
              }
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
              onChange={(e) =>
                router.push(
                  `${pathname}?${createQueryString("location", e.target.value)}`
                )
              }
              className="text-white"
            />
          </div>
          <Separator orientation="vertical" className="bg-neutral-700 h-16" />
          <div className="flex flex-grow items-center gap-3">
            <div className="w-10 min-w-10 h-10 border border-neutral-700 flex justify-center items-center text-white rounded-full text-xl p-1">
              <IoBagOutline />
            </div>
            <input
              type="text"
              placeholder="Work experience"
              onChange={(e) =>
                router.push(
                  `${pathname}?${createQueryString(
                    "experience",
                    e.target.value
                  )}`
                )
              }
              className="text-white"
            />
          </div>
          <Separator orientation="vertical" className="bg-neutral-700 h-16" />
          <div className="flex flex-grow items-center gap-3">
            <div className="w-10 min-w-10 h-10 border border-neutral-700 flex justify-center items-center text-white rounded-full text-xl p-1">
              <MdOutlineLocationOn />
            </div>
            <Select>
              <SelectTrigger className="w-[120px] text-white bg-primary border-none text-base">
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
          <div className="flex flex-grow items-center gap-5 text-white">
            <p className="min-w-max font-medium">Salary range</p>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 items-center">
                <span>₹</span>
                <Input
                  type="string"
                  placeholder="Min"
                  value={salary_gte}
                  onChange={(e) =>
                    router.push(
                      `${pathname}?${createQueryString(
                        "salary_gte",
                        e.target.value
                      )}`
                    )
                  }
                  className="text-white w-20 outline-none focus:outline-none"
                />
              </div>

              <div className="flex gap-0.5 items-center">
                <span>₹</span>
                <Input
                  type="string"
                  placeholder="Max"
                  value={salary_lte}
                  onChange={(e) =>
                    router.push(
                      `${pathname}?${createQueryString(
                        "salary_lte",
                        e.target.value
                      )}`
                    )
                  }
                  className="text-white w-20 outline-none focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
