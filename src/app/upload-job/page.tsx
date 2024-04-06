"use client";

import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "react-rte";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employmentTypesArray, workingSchedulesArray } from "../FilterComp";
import dynamic from "next/dynamic";
import { create } from "domain";
import { createJob } from "@/actions/jobActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { set } from "nprogress";
import { useSession } from "next-auth/react";
// import Editor from "./Editor";
const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

const isBrowser = typeof window !== "undefined";

export default function Page() {
  const { data: session }: { data: any } = useSession();
  const [description, setDescription] = useState("");
  const [workingSchedule, setWorkingSchedule] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState(0);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const router = useRouter();

  if (!session) {
    router.push("/")
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const job = {
      title,
      description,
      employmentType,
      workingSchedule,
      salary,
      experience,
      location,
      companyName,
      companyLogo,
    };
    const result = await createJob(job);

    if (result.success) {
      toast.success("Job created successfully");
      router.push("/");
      setEmploymentType("");
      setWorkingSchedule("");
      setTitle("");
      setSalary(0);
      setExperience("");
      setLocation("");
      setCompanyName("");
      setCompanyLogo("");
      setDescription("");
    } else {
      toast.error("Failed to create job");
    }
  };

  return (
    <div className="w-full pt-8 bg-neutral-100">
      <MaxWidthWrapper>
        <form
          className="rounded-xl min-h-[calc(100vh-4rem)] w-full bg-white"
          onSubmit={submitHandler}
        >
          <div className="px-6 py-8 border-b">
            <h1 className="font-semibold text-3xl">Upload Job</h1>
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Job title</h3>
              <p className="text-sm font-medium text-muted-foreground">
                A job title must describe one position only
              </p>
            </div>
            <Input
              placeholder="Job title"
              className="bg-muted text-black"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Job description</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Provide a short description about the job. Keep it short and to
                the point.
              </p>
            </div>
            <Editor
              description={description}
              setDescription={setDescription}
              className="h-64 rounded-xl"
            />
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Employment type</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Select the employment type for the job.
              </p>
            </div>
            <Select onValueChange={setEmploymentType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Set a employment type" />
              </SelectTrigger>
              <SelectContent>
                {employmentTypesArray.map((type, index) => (
                  <SelectItem key={index} value={type} className="capitalize">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Working schedule</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Select the working schedule for the job.
              </p>
            </div>
            <Select onValueChange={setWorkingSchedule}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Set a working schedule" />
              </SelectTrigger>
              <SelectContent>
                {workingSchedulesArray.map((type, index) => (
                  <SelectItem key={index} value={type} className="capitalize">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Salary</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Enter the salary for the job.
              </p>
            </div>
            <Input
              placeholder="Enter the salary..."
              className="bg-muted text-black"
              onChange={(e) => setSalary(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Experience</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Enter the experience for the job.
              </p>
            </div>
            <Input
              placeholder="Enter the experience..."
              className="bg-muted text-black"
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Location</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Enter the location for the job.
              </p>
            </div>
            <Input
              placeholder="Enter the location..."
              className="bg-muted text-black"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Company name</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Enter the company name for the job.
              </p>
            </div>
            <Input
              placeholder="Enter the company name..."
              className="bg-muted text-black"
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="p-6 flex justify-between items-center border-b">
            <div className="w-1/2">
              <h3 className="font-medium text-2xl">Company Logo</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Enter the company logo url for the job.
              </p>
            </div>
            <Input
              placeholder="Enter the company logo url ..."
              className="bg-muted text-black"
              onChange={(e) => setCompanyLogo(e.target.value)}
              required
            />
          </div>
          <div className="p-6 flex justify-end items-center border-b">
            <Button>Upload Job</Button>
          </div>
        </form>
      </MaxWidthWrapper>
    </div>
  );
}
