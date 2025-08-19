import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ScreenWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ScreenWrapper({ children, className }: ScreenWrapperProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-3xl rounded-lg border border-border bg-card p-6 md:p-8 shadow-lg animate-in fade-in-0 duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
