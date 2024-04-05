import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React from "react";

export default function page() {
  return (
    <div className="w-full pt-8">
      <MaxWidthWrapper>
        <div className="min-h-[80vh] w-full flex items-center justify-center">
          <div className="w-96 h-96 rounded-xl border">s</div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
