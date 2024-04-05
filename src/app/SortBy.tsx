"use client";

import React, { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortByComp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    <Select
      onValueChange={(e) => {
        router.push(`${pathname}?${createQueryString("sortBy", e)}`);
      }}
    >
      <SelectTrigger className="w-[180px] font-medium">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="updatedAt">Last updated</SelectItem>
        <SelectItem value="createdAt">Relevance</SelectItem>
      </SelectContent>
    </Select>
  );
}
