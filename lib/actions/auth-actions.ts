"use server"

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const signUp = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        await auth.api.signUpEmail({
            body: { name, email, password }
        });
    } catch (error: any) {
        return { error: error?.message ?? "Sign up failed" };
    }
    redirect("/home");
}

export const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await auth.api.signInEmail({
            body: { email, password }
        });
    } catch (error: any) {
        const message = error?.message ?? "Invalid email or password";

        redirect(`/login?error=${encodeURIComponent(message)}`); // ✅
    }

    redirect("/home");
};

export const signOut = async () => {
    await auth.api.signOut({ headers: await headers() });
    redirect("/login");
}
