import { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  className = "",
  children,
  ...props
}: Props) {
  return (
    <select
      className={`
        w-full rounded-xl border border-slate-300
        px-4 py-3
        text-sm
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
}