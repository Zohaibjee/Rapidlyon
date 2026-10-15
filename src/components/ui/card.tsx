import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "elevated";
};

export function Card({
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const surfaceClass = variant === "elevated" ? "surface-card" : "surface-panel";
  return <div className={`${surfaceClass} ${className}`.trim()} {...props} />;
}
