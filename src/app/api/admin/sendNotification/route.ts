import { messaging } from "@/lib/firebase/firebase";
import { getMessaging } from "firebase/messaging";
import { NextRequest, NextResponse } from "next/server";
import admin from "../firebaseAdmin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = body.token;
  const message = {
    token,
    notification: {
      title: "New Message",
      body: "Hello World",
    },
  };
  const response = await admin.messaging().send(message);
  console.log("Successfully sent message:", response);

  return NextResponse.json({ message: "Notification sent" });
}
