"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

// ---------------------------------------------------------------------------
// Button — atomic interactive element
// ---------------------------------------------------------------------------

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Visual style variant */
  variant?: "primary" | "ghost";
  /** Size preset */
  size?: "sm" | "md";
  /** Click handler (optional — no-op when omitted) */
  onClick?: () => void;
  /** Button content */
  children: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand text-brand-foreground hover:brightness-110 active:brightness-90 shadow-sm",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  onClick,
  children,
  className = "",
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}