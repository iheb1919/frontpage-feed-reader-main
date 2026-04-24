import SignUpPage from "./signupPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Page = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    console.log(session);
    if (session) {
        redirect("/home");
    }
    return (
        <SignUpPage />
    );
};

export default Page;