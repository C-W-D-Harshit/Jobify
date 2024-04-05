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
    setSelectedWorkingSchedules((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((schedule) => schedule !== value)
        : [...prevSelected, value]
    );
  };

  const handleEmploymentTypeChange = (value: string) => {
    setSelectedEmploymentTypes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((type) => type !== value)
        : [...prevSelected, value]
    );
  };

  // Listen for changes in search parameters and update state accordingly
  useEffect(() => {
    const workingSchedules =
      searchParams.get("workingSchedule")?.split(",") ?? [];
    const employmentTypes =
      searchParams.get("employmentType")?.split(",") ?? [];

    setSelectedWorkingSchedules(workingSchedules);
    setSelectedEmploymentTypes(employmentTypes);
  }, [searchParams]);

  // Apply filters and update URL
  // useEffect(() => {
  //   const queryParams = new URLSearchParams();

  //   if (selectedWorkingSchedules.length > 0) {
  //     queryParams.set(
  //       "workingSchedule",
  //       arrayToString(selectedWorkingSchedules)
  //     );
  //   }
  //   if (selectedEmploymentTypes.length > 0) {
  //     queryParams.set("employmentType", arrayToString(selectedEmploymentTypes));
  //   }

  //   const newQuery = queryParams.toString();
  //   const currentPath = pathname;
  //   const newPath = `${currentPath}${newQuery ? `?${newQuery}` : ""}`;

  //   router.push(newPath);
  // }, [selectedWorkingSchedules, selectedEmploymentTypes, router, pathname]);

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
