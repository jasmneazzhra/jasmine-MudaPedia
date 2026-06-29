"use client";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Button from "../ui/Button";
import { menuItems } from "@/constants/menu";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentPage = menuItems.find((item) => item.href === pathname);
  const initial = session?.user?.name?.[0]?.toUpperCase() ?? "U";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="text-2xl font-bold">
        {currentPage?.title ?? "Portfolio Manager"}
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">{session?.user?.name}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {initial}
        </div>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </Button>
      </div>
    </header>
  );
}