"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled = props.disabled;

  return (
    <div className="relative">
      <Input
        className={cn("hide-password-toggle pr-10", className)}
        ref={ref}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        disabled={disabled}
        size="sm"
        type="button"
        variant="ghost"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword && !disabled ? (
          <EyeIcon aria-hidden="true" className="h-4 w-4" />
        ) : (
          <EyeOffIcon aria-hidden="true" className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
