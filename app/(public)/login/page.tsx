import { LoginForm } from "./LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
        redirect("/feed");
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Dynamic Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-secondary/30 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-chart-1/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[440px] mx-4 p-8 sm:p-12 backdrop-blur-2xl bg-card/60 border border-border/50 shadow-2xl rounded-[2rem] transition-all duration-500 hover:shadow-primary/5 hover:border-border/80">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-3">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm font-medium">Enter your credentials to access your account</p>
                </div>
                <div className="flex flex-col text-sm mb-4 border p-2 rounded-md">
                    <h2>Demo credentials:</h2>
                    <p className="font-semibold">Email: <span className="font-normal">test@test.com</span> </p>
                    <p className="font-semibold">PassWord: <span className="font-normal">123456789</span>  </p>
                </div>
                <LoginForm initialError={searchParams.error} />

                <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/sign-up" className="font-bold text-primary hover:text-primary/80 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}