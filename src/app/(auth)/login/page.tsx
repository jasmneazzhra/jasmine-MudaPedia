import Link from "next/link";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mb-8 text-slate-500">
        Sign in to manage your portfolio.
      </p>

      <form className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Button className="w-full">
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600"
        >
          Register
        </Link>
      </p>
    </>
  );
}