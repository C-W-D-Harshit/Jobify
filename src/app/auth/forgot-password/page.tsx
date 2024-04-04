import React from "react";
import ClientComp from "./ClientComp";
import { forgotPasswordAction } from "@/actions/authActions";

export default function page() {
  return <ClientComp forgotPasswordAction={forgotPasswordAction} />;
}
