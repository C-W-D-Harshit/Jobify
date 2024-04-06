import Image from "next/image";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import JobHolder from "@/components/holders/JobHolder";
import { Suspense } from "react";
import { getJobs } from "@/actions/jobActions";
import SearchComp from "../Search";
import Sidebar from "../Sidebar";
import SortByComp from "../SortBy";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const feature = searchParams.feature ?? "all";
  const session: any = await getServerSession(authOptions as any);

  if (!session) {
    redirect("/auth/login");
  }
  let jobs = await getJobs();
  if (feature === "applied-jobs") {
    jobs = await getJobs({
      user: session?.user.id,
    });
  }
  if (feature === "saved-jobs") {
    jobs = await getJobs({
      savedByUser: session?.user.id,
    });
  }
  return (
    <main>
      <SearchComp />
      <div className="my-8">
        <MaxWidthWrapper>
          <div className="flex gap-6">
            <Sidebar />
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-semibold">
                    {feature === "applied-jobs"
                      ? "Applied jobs"
                      : feature === "saved-jobs"
                      ? "Saved jobs"
                      : "Recommended jobs"}
                  </h1>
                  <div className="border border-border px-3 font-medium py-1 rounded-full">
                    {jobs?.length}
                  </div>
                </div>
                <SortByComp />
              </div>
              <Suspense fallback={"loading..."}>
                <JobHolder searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
