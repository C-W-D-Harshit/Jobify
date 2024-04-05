"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

type FilterCompProps = {};

// Assuming arrayToString is a function that converts array to string
function arrayToString(arr: string[]): string {
  return arr.join(",");
}

const employmentTypesArray = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "PROJECT_WORK",
  "VOLUNTEERING",
];

const workingSchedulesArray = [
  "FULL_DAY",
  "FLEXIBLE_SCHEDULE",
  "SHIFT_WORK",
  "DISTANT_WORK",
  "SHIFT_METHOD",
];

export default function FilterComp({}: FilterCompProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedWorkingSchedules, setSelectedWorkingSchedules] = useState<
    string[]
  >([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);

  const handleWorkingScheduleChange = (value: string) => {
    setSelectedWorkingSchedules((prevSelected) => {
      const updatedSelection = prevSelected.includes(value)
        ? prevSelected.filter((schedule) => schedule !== value)
        : [...prevSelected, value];

      const queryParams = new URLSearchParams();
      queryParams.set("workingSchedule", arrayToString(updatedSelection));

      const newQuery = queryParams.toString();
      const currentPath = pathname;
      const newPath = `${currentPath}${newQuery ? `?${newQuery}` : ""}`;
      router.push(newPath);

      return updatedSelection;
    });
  };

  const handleEmploymentTypeChange = (value: string) => {
    setSelectedEmploymentTypes((prevSelected) => {
      const updatedSelection = prevSelected.includes(value)
        ? prevSelected.filter((type) => type !== value)
        : [...prevSelected, value];

      const queryParams = new URLSearchParams();
      queryParams.set("employmentType", arrayToString(updatedSelection));

      const newQuery = queryParams.toString();
      const currentPath = pathname;
      const newPath = `${currentPath}${newQuery ? `?${newQuery}` : ""}`;
      router.push(newPath);

      return updatedSelection;
    });
  };

  return (
    <div className="border-r">
      <h3 className="text-2xl font-semibold">Filters</h3>
      <div className="mt-4">
        <p className="font-medium text-muted-foreground mb-3">
          Working schedule
        </p>
        {workingSchedulesArray.map((schedule) => (
          <div key={schedule} className="flex items-center gap-3 mb-3">
            <Checkbox
              id={schedule}
              value={schedule}
              checked={selectedWorkingSchedules.includes(schedule)}
              onCheckedChange={() => handleWorkingScheduleChange(schedule)}
            />
            <label
              htmlFor={schedule}
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {schedule}
            </label>
          </div>
        ))}
        <p className="font-medium text-muted-foreground mb-3 mt-4">
          Employment type
        </p>
        {employmentTypesArray.map((type) => (
          <div key={type} className="flex items-center gap-3 mb-3">
            <Checkbox
              id={type}
              value={type}
              checked={selectedEmploymentTypes.includes(type)}
              onCheckedChange={() => handleEmploymentTypeChange(type)}
            />
            <label
              htmlFor={type}
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
