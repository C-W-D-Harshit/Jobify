"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { saveJob } from "@/actions/jobActions";
import toast from "react-hot-toast";

type JobCardProps = {
  job: {
    id: string;
    title: string;
    description: string;
    salary: number;
    employmentType: string;
    workingSchedule: string;
    experience: string;
    location: string;
    createdAt: string;
    companyName: string;
    companyLogo: string;
  };
};

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function formatDateFromDB(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return formatDate(date);
}

export default function JobCard(props: JobCardProps) {
  const { data: session }: { data: any } = useSession();
  const [bgColorClass, setBgColorClass] = useState("bg-[#ffe1cc]");

  useEffect(() => {
    const colors = [
      "bg-[#e3dbfa]",
      "bg-[#fbe2f4]",
      "bg-[#ffe1cc]",
      "bg-[#d4f6ed]",
    ]; // Array of Tailwind CSS classes for background colors
    const randomIndex = Math.floor(Math.random() * colors.length); // Get a random index
    setBgColorClass(colors[randomIndex]);

    return () => {};
  }, []);
  // Set the background color class to the randomly selected color class

  const handleSaveJob = async () => {
    if (!session) {
      toast.error("Please login to save the job");
    }

    const result = await saveJob(props.job.id, session?.user?.id);
    if (result.success) {
      toast.success("Job saved successfully");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full h-80 shadow-xl bg-white rounded-xl border p-2 flex flex-col gap-3">
      <div className={`flex-grow rounded-xl p-3 py-3 ${bgColorClass}`}>
        <div className="flex items-center justify-between">
          <div className="px-2.5 py-1 font-medium text-sm bg-white rounded-full">
            {formatDateFromDB(props.job.createdAt)}
          </div>
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleSaveJob}
            className="rounded-full text-xl"
          >
            <MdOutlineBookmarkBorder />
          </Button>
        </div>
        <div className="flex items-end justify-between my-3 px-1">
          <div>
            <p className="font-semibold text-sm capitalize">
              {props.job.companyName}
            </p>
            <p className="text-2xl font-medium capitalize">{props.job.title}</p>
          </div>
          <div className="w-10 h-10 rounded-full relative">
            <Image
              src={props.job.companyLogo ?? "/assets/amazon.png"}
              className="rounded-full object-cover"
              fill
              alt="Amazon logo"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-4">
          <div className="flex items-center gap-1 border border-neutral-500 px-2 py-1 rounded-full">
            <p className="text-sm font-medium capitalize">
              {props.job.employmentType}
            </p>
          </div>
          <div className="flex items-center gap-1 border border-neutral-500 px-2 py-1 rounded-full capitalize">
            <p className="text-sm font-medium">{props.job.experience}</p>
          </div>
          <div className="flex items-center gap-1 border border-neutral-500 px-2 py-1 rounded-full capitalize">
            <p className="text-sm font-medium">{props.job.workingSchedule}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pb-2 px-1">
        <div className="flex flex-col">
          <p className="font-medium text-base">₹{props.job.salary}/month</p>
          <p className="text-sm font-medium text-muted-foreground capitalize">
            {props.job.location}
          </p>
        </div>
        <Link href={`/jobs/${props.job.id}`}>
          <Button className="rounded-full">Details</Button>
        </Link>
      </div>
    </div>
  );
}
