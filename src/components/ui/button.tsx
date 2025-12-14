import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors";
  const styles =
    variant === "outline"
      ? "border border-accent/30 bg-transparent text-foreground hover:bg-accent/10"
      : "bg-accent text-accent-foreground hover:opacity-90";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
