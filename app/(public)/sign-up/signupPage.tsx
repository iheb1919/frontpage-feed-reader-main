
"use client"
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Mail, ArrowRight, Lock, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { signUp } from "@/lib/actions/auth-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FieldError } from "@/components/ui/field";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupValues = z.infer<typeof signupSchema>;

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<SignupValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: SignupValues) => {
        setServerError(null);
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);

            const result = await signUp(formData);
            if (result?.error) {
                setServerError(result.error);
            } else if (result?.success) {
                router.push("/feed");
                router.refresh();
            }
        } catch (error: any) {
            setServerError(error?.message ?? "Something went wrong");
        }
    };
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

                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <Field data-invalid={!!form.formState.errors.name}>
                        <FieldLabel htmlFor="name">Your name</FieldLabel>
                        <InputGroup className="h-12! rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:bg-background transition-all shadow-sm">
                            <InputGroupInput 
                                {...form.register("name")}
                                aria-invalid={!!form.formState.errors.name}
                                id="name" 
                                placeholder="Full Name" 
                                autoComplete="off" 
                            />
                            <InputGroupAddon className="pl-3 flex items-center justify-center" >
                                <User className="h-5! w-5! shrink-0" />
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldError>{form.formState.errors.name?.message}</FieldError>
                    </Field>

                    <Field data-invalid={!!form.formState.errors.email}>
                        <FieldLabel htmlFor="email">Your email address</FieldLabel>
                        <InputGroup className="h-12! rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:bg-background transition-all shadow-sm">
                            <InputGroupInput 
                                {...form.register("email")}
                                aria-invalid={!!form.formState.errors.email}
                                id="email" 
                                placeholder="name@example.com"
                                autoComplete="email"
                            />
                            <InputGroupAddon className="pl-3 flex items-center justify-center" >
                                <Mail className="h-5! w-5! shrink-0" />
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldError>{form.formState.errors.email?.message}</FieldError>
                    </Field>

                    <Field data-invalid={!!form.formState.errors.password}>
                        <FieldLabel htmlFor="password">Your password</FieldLabel>
                        <InputGroup className="h-12! rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:bg-background transition-all shadow-sm">
                            <InputGroupInput 
                                {...form.register("password")}
                                aria-invalid={!!form.formState.errors.password}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                autoComplete="new-password"
                            />
                            <InputGroupAddon className="pl-3 flex items-center justify-center" >
                                <Lock className="h-5! w-5! shrink-0" />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end" className="pr-3 cursor-pointer flex items-center justify-center" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="h-5! w-5! shrink-0" /> : <Eye className="h-5! w-5! shrink-0" />}
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldError>{form.formState.errors.password?.message}</FieldError>
                    </Field>

                    {serverError && (
                        <p className="text-destructive text-sm font-medium text-center bg-destructive/10 py-2 rounded-lg">
                            {serverError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="group w-full flex items-center justify-center gap-2 h-12 mt-4 rounded-xl bg-primary text-primary-foreground font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"} 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;