import Link from "next/link";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Portfolio",
    href: "/dashboard/portfolio",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white p-6">
      <h1 className="mb-10 text-2xl font-bold text-blue-600">
        Portfolio Manager
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="block rounded-lg px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
          >
            {menu.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}