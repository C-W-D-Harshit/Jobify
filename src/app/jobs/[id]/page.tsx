import { getJobById } from "@/actions/jobActions";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const job = await getJobById(params.id);
  return (
    <div className="w-full flex">
      <div className="w-full flex-grow border-r">
        <div className="h-24 flex items-center justify-between px-8 border-b">
          <h1 className="text-3xl font-semibold">{job?.title}</h1>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <div className="flex items-center gap-1 border border-neutral-500 px-2 py-1 rounded-full">
              <p className="text-sm font-medium capitalize">
                {job?.employmentType}
              </p>
            </div>
            <div className="flex items-center gap-1 border border-neutral-500 px-2 py-1 rounded-full capitalize">
              <p className="text-sm font-medium">{job?.experience}</p>
            </div>
            <div className="flex items-center gap-1 border border-neutral-500 px-2 py-1 rounded-full capitalize">
              <p className="text-sm font-medium">{job?.workingSchedule}</p>
            </div>
          </div>
        </div>
        <div
          className="prose p-6"
          dangerouslySetInnerHTML={{ __html: job?.description ?? "" }}
        />
      </div>
      <div className="w-64 min-h-[80vh] flex flex-col justify-end items-center px-2 py-6">
        <Button className="rounded-full">Apply Now</Button>
      </div>
    </div>
  );
}
