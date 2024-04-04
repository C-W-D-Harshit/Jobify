"use server";

import NewArrivalEmailTemplate from "@/components/templates/email/NewArrivalEmailTemplate";
import { prisma } from "@/lib/prisma/prisma";
import { forgotPasswordSchema, resetPasswordSchema } from "@/schema/authSchema";
import { resend } from "@/utils/resend";
import bcrypt from "bcryptjs";

function generateOTP() {
  const otpLength = 6;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const forgotPasswordAction = async (formData: forgotPasswordSchema) => {
  let data;
  try {
    const response: forgotPasswordSchema = forgotPasswordSchema.parse(formData);
    data = response;
  } catch (error: any) {
    return {
      error: "Validation error: " + error.message,
    };
  }
  const { email } = data;

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      error: "User not found",
    };
  }
  //   const passwordChangedRecently =
  //     user.passwordChangedAt &&
  //     new Date(user.passwordChangedAt).getTime() > Date.now() - 5 * 60 * 1000;
  //   if (passwordChangedRecently) {
  //     return {
  //       error:
  //         "Password was changed recently. Please wait before resetting again.",
  //     };
  //   }

  // create verifyKey
  const passwordResetToken = generateOTP();
  const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  user = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordResetExpires,
      passwordResetToken,
    },
  });

  // creating necessary fields
  var nameParts: any = user.name.split(" ");
  const firstName: string = nameParts[0];
  const otp = user.passwordResetToken as number;

  const { error } = await resend.emails.send({
    from: "Homely Bites <hello@homelybites.store>",
    to: [user.email],
    subject: "Welcome to Homely Bites!",
    react: NewArrivalEmailTemplate({ name: firstName, verifyKey: otp }),
  });
  if (error) {
    return { error: "Error sending email: " + error.message };
  }

  return { message: "Email sent to your registered email address!" };
};

export const resetPasswordAction = async (
  formData: resetPasswordSchema,
  { email }: { email: string }
) => {
  let data: any;
  try {
    const response = resetPasswordSchema.parse(formData);
    data = response;
  } catch (error: any) {
    return {
      error: "Validation error: " + error.message,
    };
  }
  const { password } = data;
  const passwordResetToken = Number(data.passwordResetToken);

  const user = await prisma.user.findFirst({
    where: {
      email,
      passwordResetToken,
      passwordResetExpires: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return {
      error: "Token is either invalid or expired!",
    };
  }

  //   const passwordChangedRecently =
  //     user.passwordChangedAt &&
  //     new Date(user.passwordChangedAt).getTime() > Date.now() - 5 * 60 * 1000;
  //   if (passwordChangedRecently) {
  //     return {
  //       error:
  //         "Password was changed recently. Please wait before resetting again.",
  //     };
  //   }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
  });
  return {
    message: "Password Reset Successfull!",
  };
};
