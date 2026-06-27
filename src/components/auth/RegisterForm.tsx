"use client";

import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      alert(result.message);

      if (result.success) {
        setForm({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your full name"
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}