import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/schema/authSchema";
import SessionChecker from "@/lib/session/SessionChecker";
import { resend } from "@/utils/resend";
import NewArrivalEmailTemplate from "@/components/templates/email/NewArrivalEmailTemplate";
// import twilio from "twilio";

function generateOTP() {
  const otpLength = 6;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST(req: NextRequest) {
  try {
    // validation
    const body = await req.json();

    let name;
    let email;
    let phoneNumber;
    let password_;
    let confirmPassword;

    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const token = <string>process.env.TWILIO_AUTH_TOKEN;
    // const client = twilio(accountSid, token);

    try {
      const response = signUpSchema.parse(body);
      email = response.email;
      name = response.name;
      // phoneNumber = response.phoneNumber;
      password_ = response.password;
      confirmPassword = response.confirmPassword;
    } catch (validationError: any) {
      return NextResponse.json(
        {
          error: "Validation error: " + validationError.message,
        },
        {
          status: 400,
        }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists!",
        },
        {
          status: 400,
        }
      );
    }

    // hashing the password
    const password = await bcrypt.hash(password_, 10);
    // create verifyKey
    const verifyKey = generateOTP();
    const verifyKeyExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Create the user after all checks
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        // phoneNumber,
        verifyKey,
        verifyKeyExpires,
      },
    });

    // send email
    // creating necessary fields
    var nameParts: any = user.name.split(" ");
    const firstName: string = nameParts[0];
    const otp = user.verifyKey as number;
    // client.messages.create({
    //   body: `Welcome to Homely Bites! Your OTP is ${otp}`,
    //   from: "+14245431396",
    //   to: "+919818525635",
    // });
    const { data, error } = await resend.emails.send({
      from: "Homely Bites <hello@homelybites.store>",
      to: [user.email],
      subject: "Welcome to Homely Bites!",
      react: NewArrivalEmailTemplate({ name: firstName, verifyKey: otp }),
    });
    if (error) {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      return NextResponse.json(
        { error: "Error registering user: " + error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Registered Successfully!", user, password_ },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error registering user: " + error.message },
      { status: 500 }
    );
  }
}
