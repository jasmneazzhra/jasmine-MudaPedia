import Link from "next/link";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">
        Create Account
      </h1>

      <p className="mb-8 text-slate-500">
        Start organizing your projects today.
      </p>

      <form className="space-y-5">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
        />

        <Button className="w-full">
          Register
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600"
        >
          Login
        </Link>
      </p>
    </>
  );
}