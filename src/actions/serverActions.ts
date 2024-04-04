"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function serverRedirect(path: string) {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }

  redirect(path); // Navigate to the new post page
}
