import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { serverRedirect } from "@/actions/serverActions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions as any);
  if (session) {
    redirect("/");
  }
  return <Suspense>{children}</Suspense>;
}
