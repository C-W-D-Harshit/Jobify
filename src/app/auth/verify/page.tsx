"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { verifySchema, signUpSchema } from "@/schema/authSchema";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import {
  checkForServiceablePincode,
  resendOTP,
  verifyEmail,
} from "@/actions/onboardingAction";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";

export default function Page() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      verifyKey: "",
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const gg = async (formData: verifySchema) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    const result: any = await verifyEmail(formData);
    // Check if sign-in was successful
    if (result.error) {
      // Handle sign-in error (display error message, etc.)
      throw new Error(result.error);
    } else {
      // Sign-in was successful, handle redirect or other actions
      update({
        verified: true,
      });
      router.replace("/");
    }
    return result;
  };

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof verifySchema>) {
    // Define a minimum delay of 0.8 seconds (2000 milliseconds)
    const minimumDelay = 800;

    // Delay the execution of gg function
    await new Promise((resolve) => {
      setTimeout(resolve, minimumDelay);
    });

    // Trigger the sign-in process
    const fg = gg(data);

    toast.promise(
      fg
        .then((result: any) => {
          // Handle success

          return result; // Pass the result to the success callback
        })
        .catch((error: any) => {
          // Handle error and get the error message
          return Promise.reject(error); // Pass the error to the error callback
        }),
      {
        loading: "Verifying...",
        error: (error) => {
          // Display the error message using toast.error
          return error.message; // Return the error message
        },
        success: "Email verified!",
      }
    );
  }
  const handleResendOTP = async () => {
    const result = await resendOTP();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("OTP resent successfully!");
    }
  };
  return (
    <div className="">
      <MaxWidthWrapper>
        <div className="py-8">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-3xl font-bold"
            onClick={() => router.back()}
          >
            <BsArrowLeft />
          </Button>
          <div className="h-0"></div>
          <div className="mt-2 mb-1">
            <h1 className="text-4xl font-semibold">Verify!</h1>
            <h1 className="text-4xl font-semibold">
              Plz complete the verification step!
            </h1>
          </div>
          <div className="my-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="text-right" />
                      <FormControl className="focus-within:border-primary">
                        <Input
                          placeholder="Please enter otp sent to your email..."
                          className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="verifyKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="text-right" />
                      <FormControl className="focus-within:border-primary">
                        <Input
                          placeholder="Please enter otp sent to your email..."
                          className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size={"default"}
                  className="w-full h-12 text-lg"
                >
                  Verify
                </Button>
                <Button
                  type="button"
                  size={"default"}
                  className="w-full h-12 text-lg border border-primary"
                  variant={"outline"}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
