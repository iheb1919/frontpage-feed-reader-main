"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { signIn } from "@/lib/actions/auth-actions"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm({ initialError }: { initialError?: string }) {
    const [showPassword, setShowPassword] = useState(false)
    const [serverError, setServerError] = useState<string | null>(initialError || null)
    const router = useRouter()

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: LoginValues) => {
        setServerError(null)
        try {
            const formData = new FormData()
            formData.append("email", values.email)
            formData.append("password", values.password)
            
            const result = await signIn(formData)
            if (result?.error) {
                setServerError(result.error)
            } else if (result?.success) {
                router.push("/feed")
                router.refresh()
            }
        } catch (error: any) {
            setServerError(error?.message ?? "Something went wrong")
        }
    }

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                        autoComplete="current-password"
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
                {form.formState.isSubmitting ? "Signing In..." : "Sign In"} 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    )
}
