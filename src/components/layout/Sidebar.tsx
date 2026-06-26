"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { menuItems } from "@/constants/menu";
import Logo from "./Logo";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
        <div className="border-b p-6">
        <Logo />
        </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50"
                }
              `}
            >
              <Icon />

              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}