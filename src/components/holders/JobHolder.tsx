import React from "react";
import JobCard from "../card/JobCard";
import { getJobs } from "@/actions/jobActions";

function parseEmploymentTypes(
  paramValue: string | undefined
): string[] | undefined {
  if (!paramValue) return undefined;
  return paramValue.split(",");
}

function stringToArray(str: string | null): string[] {
  return str ? str.split(",") : [];
}

export default async function JobHolder({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const salary_gte = searchParams.salary_gte
    ? parseInt(searchParams.salary_gte as string)
    : 0;
  const salary_lte = searchParams.salary_lte
    ? parseInt(searchParams.salary_lte as string)
    : 1000000;
  const experience = searchParams.experience;
  const location = searchParams.location;
  const employmentType = parseEmploymentTypes(
    searchParams.employmentType as string
  );
  const workingSchedule = parseEmploymentTypes(
    searchParams.workingSchedule as string
  );
  const search = searchParams.search ?? "";
  const sortBy = searchParams.sortBy ?? "createdAt";
  const orderBy = searchParams.orderBy ?? "asc";
  const jobs = await getJobs(
    {
      salary: {
        gte: salary_gte, // Jobs with salary greater than or equal to 50000
        lte: salary_lte, // Jobs with salary less than or equal to 100000
      },
      experience: experience, // Jobs requiring at least 2 years of experience

      location: location, // Jobs requiring at least 2 years of experience
      employmentType,
      workingSchedule,
      title: search, // Jobs with title containing "Software Engineer"
    },
    sortBy,
    orderBy
  );
  // console.log(jobs);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {jobs.map((job: any) => {
        return <JobCard key={job.id} job={job} />;
      })}
    </div>
  );
}
