import React, { forwardRef, useState } from "react";
import { cn } from "@/utils";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "./label";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
  required?: boolean;
  optional?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type,
      label,
      error,
      startIcon,
      endIcon,
      id,
      required,
      optional,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine if this is a password field
    const isPassword = type === "password";
    
    // Handle password visibility toggle
    const togglePassword = () => setShowPassword(!showPassword);

    // Determine the actual input type for password fields
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // Generate a unique ID if none provided
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

    // Required/Optional label logic
    const renderRequiredOptional = () => {
      if (required) {
        return <span className="text-red-500 ml-1">*</span>;
      }
      if (optional) {
        return <span className="text-muted-foreground text-xs ml-1">(Optional)</span>;
      }
      return null;
    };

    return (
      <div className={cn("space-y-1", containerClassName)}>
        {label && (
          <div className="flex items-center">
            <Label
              htmlFor={inputId}
              className={cn(
                "text-xs font-normal text-muted-foreground text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
              )}
            >
              {label}
              {renderRequiredOptional()}
            </Label>
          </div>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startIcon}
            </div>
          )}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus-visible:ring-red-500",
              startIcon && "pl-10",
              (endIcon || isPassword) && "pr-10",
              className
            )}
            ref={ref}
            aria-required={required}
            {...props}
          />
          {endIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}
          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500">{error.message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export {Input}