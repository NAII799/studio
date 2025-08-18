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
        "relative w-full max-w-3xl rounded-2xl border border-white/20 bg-card p-6 md:p-10 shadow-2xl backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-5 duration-500",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-t-2xl" />
      {children}
    </div>
  );
}
