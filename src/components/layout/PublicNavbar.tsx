import Link from "next/link";

import Button from "../ui/Button";
import Logo from "./Logo";

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <Link href="/login">
          <Button>
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}