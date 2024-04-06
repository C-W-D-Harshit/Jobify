import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React from "react";
import Landing from "./Landing";
import LoginForm from "./LoginForm";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const step = searchParams.step ?? "1";
  return (
    <div className="my-6 h-[100dvh]">
      <MaxWidthWrapper className="h-full max-w-screen-lg">
        {step === "1" ? <Landing /> : <LoginForm />}
      </MaxWidthWrapper>
    </div>
  );
}
