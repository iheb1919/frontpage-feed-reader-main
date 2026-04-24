"use client"
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { EyeOff, Eye, Lock } from "lucide-react";
import { useState } from "react";

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Field>
            <FieldLabel htmlFor="password">Your password</FieldLabel>
            <InputGroup className="h-12! rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:bg-background transition-all shadow-sm">
                <InputGroupInput id="password" name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                />
                <InputGroupAddon className="pl-3 flex items-center justify-center" >
                    <Lock className="h-5! w-5! shrink-0" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" className="pr-3 cursor-pointer flex items-center justify-center" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5! w-5! shrink-0" /> : <Eye className="h-5! w-5! shrink-0" />}
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}
export default PasswordInput