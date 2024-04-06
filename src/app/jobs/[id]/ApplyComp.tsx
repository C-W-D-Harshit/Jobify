"use client";

import { applyJob } from "@/actions/jobActions";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

export default function ApplyComp({ job }: any) {
  const { data: session }: { data: any } = useSession();

  const handleSubmit = async () => {
    if (!session) {
      // Redirect to login page
      return;
    }
    // Apply for job
    const result = await applyJob(job?.id ?? "", session?.user?.id);
    if (result.success) {
      // Show success message
      toast.success("You have successfully applied for this job");
    } else {
      // Show error message
      toast.error(result.message);
    }
  };
  return (
    <Button className="rounded-full" onClick={handleSubmit}>
      Apply Now
    </Button>
  );
}
