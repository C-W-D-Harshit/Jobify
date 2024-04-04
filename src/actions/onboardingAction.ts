"use server";

import NewArrivalEmailTemplate from "@/components/templates/email/NewArrivalEmailTemplate";
import { prisma } from "@/lib/prisma/prisma";
import SessionChecker from "@/lib/session/SessionChecker";
import {
  checkAddressSchema,
  getPhoneNumberSchema,
  verifySchema,
} from "@/schema/authSchema";
import { resend } from "@/utils/resend";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/dist/server/api-utils";

export const checkForServiceablePincode = async (
  formData: checkAddressSchema
) => {
  SessionChecker({ basic: true });
  let data;
  try {
    const response = checkAddressSchema.parse(formData);
    data = response;
  } catch (err: any) {
    return {
      error: "Validation error: " + err.message,
    };
  }
  const pincode = data.pincode;

  // check for serviceable pincode
  const serviceablePincode = await prisma.serviceablePincodes.findFirst({
    where: { pincode },
  });

  if (!serviceablePincode) {
    return {
      error: "Pincode not serviceable!",
    };
  }
  return {
    message: "Pincode is serviceable!",
  };
};

export const getPhoneNumber = async (formData: getPhoneNumberSchema) => {
  const session = await SessionChecker({ basic: true });
  let data;
  try {
    const response = getPhoneNumberSchema.parse(formData);
    data = response;
  } catch (err: any) {
    return {
      error: "Validation error: " + err.message,
    };
  }
  const phoneNumber = data.phoneNumber;

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        phoneNumber,
        onboardingComplete: true,
      },
    });

    // Assuming updateUser will always be truthy if update is successful
    return {
      message: "Got it!",
    };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      // Check if we have a unique constraint violation
      if (err.code === "P2002") {
        return {
          error: "This phone number is already in use.",
        };
      }
    }

    // For any other errors, return a generic error message
    return {
      error: "An unexpected error occurred.",
    };
  }
};

export const verifyEmail = async (formData: verifySchema) => {
  SessionChecker({ basic: true });
  console.log("asd");
  let data;
  try {
    const response = verifySchema.parse(formData);
    data = response;
  } catch (err: any) {
    return {
      error: "Validation error: " + err.message,
    };
  }
  const email = data.email;
  const verifyKey = Number(data.verifyKey);

  const user = await prisma.user.findFirst({
    where: {
      email,
      isVerified: false,
      verifyKey,
      verifyKeyExpires: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return {
      error: "Opt is either invalid or expired!",
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
    },
  });
  return {
    message: "Email Verified Successfully!",
  };
};

function generateOTP() {
  const otpLength = 6;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const resendOTP = async () => {
  const session = await SessionChecker({ basic: true });
  // create verifyKey
  const verifyKey = generateOTP();
  const verifyKeyExpires = new Date(Date.now() + 10 * 60 * 1000);

  // Create the user after all checks
  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      verifyKey,
      verifyKeyExpires,
    },
  });

  // send email
  // creating necessary fields
  var nameParts: any = user.name.split(" ");
  const firstName: string = nameParts[0];
  const otp = user.verifyKey as number;
  const { data, error } = await resend.emails.send({
    from: "Homely Bites <hello@homelybites.store>",
    to: [user.email],
    subject: "Welcome to Homely Bites!",
    react: NewArrivalEmailTemplate({ name: firstName, verifyKey: otp }),
  });
  if (error) {
    return { error: "Error registering user: " + error.message };
  }

  return { message: "Registered Successfully!" };
};

export const saveTokenToDB = async (token: string) => {
  const session = await SessionChecker({ basic: true });
  // save token to db
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      token,
    },
  });
  return { message: "Token saved successfully!" };
};
