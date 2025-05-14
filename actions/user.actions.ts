'use server';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import  prisma  from "db/prisma"; // Adjust the import path according to your project structure

export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;

import { signInFormSchema } from "@/lib/validators";

import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false, // optional: prevent automatic redirect
    });

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error("SignIn Error:", error); // helpful during dev

    return { success: false, message: "Invalid email or password" };
  }
}

// Sign out user
export async function signOutUser(): Promise<void> {
  await signOut({ redirect: false });
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    // Assuming you are using Prisma as ORM
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { // Adjust this as needed to fetch related data
        orders: true, // example of including related orders
        cart: true,   // example of including cart data
      },
    });

    if (!user) throw new Error("User not found");

    return user; // Return the user object
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error(`Error fetching user: ${error instanceof Error ? error.message : error}`);
  }
}
