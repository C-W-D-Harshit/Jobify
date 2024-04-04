/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
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
import { forgotPasswordSchema, signUpSchema } from "@/schema/authSchema";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import axios from "axios";
import { checkForServiceablePincode } from "@/actions/onboardingAction";
// import { forgotPasswordAction } from "@/actions/authActions";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";

export default function ClientComp({
  forgotPasswordAction,
}: {
  forgotPasswordAction: any;
}) {
  const router = useRouter();
  const path = usePathname();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const gg = async (formData: forgotPasswordSchema) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    const result: any = await forgotPasswordAction(formData);
    // Check if sign-in was successful
    if (result.error) {
      // Handle sign-in error (display error message, etc.)
      throw new Error(result.error);
    } else {
      // Sign-in was successful, handle redirect or other actions

      router.push(`/auth/reset-password?email=${formData.email}`);
    }
    return result;
  };

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
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
        loading: "Checking your email...",
        error: (error) => {
          // Display the error message using toast.error
          return error.message; // Return the error message
        },
        success: "Email sent to your registered email address!",
      }
    );
  }
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
            <h1 className="text-4xl font-semibold">Forgot Password!</h1>
            {/* <h1 className="text-4xl font-semibold">
              Plz check that our services are near you!
            </h1> */}
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
                          placeholder="Please enter your registered email..."
                          className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                          type="email"
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
                  Next
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
