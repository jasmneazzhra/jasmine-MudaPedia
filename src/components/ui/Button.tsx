import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "w-fit rounded-lg px-5 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}