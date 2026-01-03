import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

export default function IconButton({
  children,
  size = "md",
  className = "",
  ...props
}: IconButtonProps) {
  const sizes: Record<string, string> = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
