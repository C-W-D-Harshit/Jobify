/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { signUpSchema } from "@/schema/authSchema";
import axios from "axios";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

export default function SignUpForm() {
  const router = useRouter();
  const path = usePathname();
  // const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const gg = async (formData: signUpSchema) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    const result: any = await axios.post(`/api/auth/signup`, formData);
    // Check if sign-in was successful
    if (result.error) {
      // Handle sign-in error (display error message, etc.)
      throw new Error(result.error);
    } else {
      // Sign-in was successful, handle redirect or other actions
      await signIn("credentials", {
        redirect: false, // Set to false to handle redirect manually
        email: formData.email,
        password: formData.password,
      });
      // // Save the FCM token to the database
      // fcmToken && (await saveTokenToDB(fcmToken));
      // toast.success(fcmToken);
      router.push("/");
    }
    return result;
  };

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    // Define a minimum delay of 0.8 seconds (2000 milliseconds)
    const minimumDelay = 800;

    // Delay the execution of gg function
    await new Promise((resolve) => {
      setTimeout(resolve, minimumDelay);
    });

    // Trigger the sign-in process
    const fg: any = gg(data);

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
        loading: "Signing you in...",
        error: (error) => {
          // Display the error message using toast.error
          return error.message; // Return the error message
        },
        success: "Sign Up Successfully....",
      }
    );
  }
  const login = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: process.env.NEXT_PUBLIC_URL,
      });
      toast.loading("Logging in...!");
    } catch (error: any) {
      // Handle errors, possibly by displaying an error message using toast.error() or other means
      toast.error(`Error: ${error.message}`);
    }
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  //     const messaging = getMessaging(firebaseApp);
  //     const unsubscribe = onMessage(messaging, (payload) => {
  //       console.log("Foreground push notification received:", payload);
  //       // Handle the received push notification while the app is in the foreground
  //       // You can display a notification or update the UI based on the payload
  //     });
  //     return () => {
  //       unsubscribe(); // Unsubscribe from the onMessage event
  //     };
  //   }
  // }, []);

  return (
    <div className="py-6">
      <MaxWidthWrapper className="max-w-screen-lg">
        <div>
          <Link href={"/auth/login?step=1"}>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="font-bold text-2xl"
            >
              <GoArrowLeft />
            </Button>
          </Link>
          <div className="h-24 my-3 bg-red-100"></div>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold">Hello!</h2>
            <h2 className="text-3xl font-semibold">
              {" "}
              Register to get Started!
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage className="text-right" />
                    <FormControl className="focus-within:border-primary">
                      <Input
                        placeholder="Please enter your name..."
                        className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="text-right" />
                      <FormControl className="focus-within:border-primary">
                        <Input
                          placeholder="Please enter your phone number..."
                          className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage className="text-right" />
                    <FormControl className="focus-within:border-primary">
                      <Input
                        placeholder="Please enter your email address..."
                        className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage className="text-right" />
                    <FormControl className="focus-within:border-primary">
                      <Input
                        placeholder="Please enter your password..."
                        className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage className="text-right" />
                    <FormControl className="focus-within:border-primary">
                      <Input
                        placeholder="Please retype your password..."
                        className="bg-primary/10 drop-shadow-none h-12 focus-visible:ring-primary/35 px-4 border-slate-300"
                        type="password"
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
                Signup
              </Button>
            </form>
          </Form>
          <div className="flex items-center my-16">
            <hr className="w-full" />
            <p className="min-w-max mx-2 font-medium text-muted-foreground">
              Or Login with
            </p>
            <hr className="w-full" />
          </div>
          <div className="flex items-center justify-between gap-3 mt-4">
            <Button
              className="gap-3 w-full text-lg font-medium text-blue-500"
              variant={"outline"}
              size={"lg"}
            >
              <FaFacebookF />
            </Button>
            <Button
              className="gap-3 w-full text-lg font-medium"
              variant={"outline"}
              size={"lg"}
              onClick={() => login("google")}
            >
              <FcGoogle />
            </Button>
            <Button
              className="gap-3 w-full text-lg font-medium"
              variant={"outline"}
              size={"lg"}
            >
              <FaApple />
            </Button>
          </div>
          <div className="my-6 w-full flex items-center justify-center">
            <p className="text-center text-base text-muted-foreground font-medium">
              Already have an account?{" "}
              <Link href={"/auth/login?step=2"} className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
