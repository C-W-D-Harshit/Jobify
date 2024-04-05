import Image from "next/image";
import SearchComp from "./Search";
import Sidebar from "./Sidebar";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import SortByComp from "./SortBy";
import JobCard from "@/components/card/JobCard";
import JobHolder from "@/components/holders/JobHolder";
import { Suspense } from "react";
import { getJobs } from "@/actions/jobActions";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const jobs = await getJobs();
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
                  <h1 className="text-3xl font-semibold">Recommended jobs</h1>
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
