import { getJobs } from "@/actions/jobActions";
import JobCard from "@/components/card/JobCard";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobs = await getJobs();
  return (
    <div className="bg-neutral-100 min-h-screen">
      <MaxWidthWrapper>
        <div className="w-full flex gap-6">
          <div className="grid grid-cols-1 gap-2 mt-8">
            {jobs.map((job: any) => {
              return <JobCard key={job.id} job={job} />;
            })}
          </div>
          <div className="drop-shadow-xl rounded-xl mt-8 bg-white min-h-[80vh] w-full flex-grow h-full">
            {children}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
