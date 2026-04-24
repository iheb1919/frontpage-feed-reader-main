
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { signIn } from "@/lib/actions/auth-actions";
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link";
import PasswordInput from "./Login";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
        redirect("/home");
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

                <form className="space-y-6" action={signIn} >
                    <Field>
                        <FieldLabel htmlFor="email">Your email address</FieldLabel>
                        <InputGroup className="h-12! rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:bg-background transition-all shadow-sm">
                            <InputGroupInput id="email"
                                name="email" placeholder="name@example.com"
                                autoComplete="email"
                                defaultValue="ihebmejri14@gmail.com"
                                required
                            />
                            <InputGroupAddon className="pl-3 flex items-center justify-center" >
                                <Mail className="h-5! w-5! shrink-0" />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <PasswordInput />
                    <button
                        type="submit"
                        className="group w-full flex items-center justify-center gap-2 h-12 mt-4 rounded-xl bg-primary text-primary-foreground font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
                    >
                        Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/sign-up" className="font-bold text-primary hover:text-primary/80 transition-colors">
                        Sign up
                    </Link>
                </p>
                {searchParams.error && (
                    <p className="text-red-500 text-sm text-center">
                        {searchParams.error}
                    </p>
                )}
            </div>
        </div>
    )
}