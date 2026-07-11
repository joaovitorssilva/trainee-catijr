import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/utils/utils"

type ButtonVariant = "primary" | "ghost" | "active" | "outline" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-options-button-pressed text-white font-medium ",
  ghost: "bg-transparent text-subdued hover:text-white",
  active: "bg-white text-black font-semibold rounded-full",
  outline: "border border-essential-subdued text-white font-bold text-[10px]",
  icon: "bg-transparent text-subdued rounded-full",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-[10px] px-3 py-1.5 ",
  md: "text-[10px] flex justify-center w-[56px] py-2.5",
  lg: "text-base px-6 py-3"
}

export default function Button({
  variant = "primary",
  size = "md",
  isActive = false,
  className,
  children,
  ...props
 }: ButtonProps) {
  
  const resolvedVariant = isActive ? "active" : variant;

  return (
    <button
      className={cn(
        "rounded-full cursor-pointer transition-all duration-150 flex items-center outline-none gap-2", 
        variantStyles[resolvedVariant], 
        sizeStyles[size],
        className     
      )} 
      {...props}
      >
        {children}
    </button>
  )
}