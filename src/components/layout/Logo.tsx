import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
        PM
      </div>

      <div>
        <h1 className="font-bold">
          Portfolio Manager
        </h1>

        <p className="text-xs text-slate-500">
          Organize Your Projects
        </p>
      </div>
    </Link>
  );
}