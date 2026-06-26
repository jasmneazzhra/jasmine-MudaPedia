import Button from "../ui/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-6 text-5xl font-extrabold leading-tight">
        Store Your Projects.
        <br />
        <span className="text-blue-600">
          Build Your Future.
        </span>
      </h1>

      <p className="mb-10 max-w-2xl text-lg text-slate-600">
        Save every project you've built, organize your portfolio,
        and never lose your work again.
      </p>

      <Link href="/register">
        <Button>
          Get Started
        </Button>
      </Link>
    </section>
  );
}