import Image from "next/image";
import SearchComp from "./Search";
import Sidebar from "./Sidebar";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import SortByComp from "./SortBy";

export default function Home() {
  return (
    <main>
      <SearchComp />
      <div className="my-6">
        <MaxWidthWrapper>
          <div className="flex gap-6">
            <Sidebar />
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-semibold">Recommended jobs</h1>
                  <div className="border border-border px-3 font-medium py-1 rounded-full">
                    386
                  </div>
                </div>
                <SortByComp />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
