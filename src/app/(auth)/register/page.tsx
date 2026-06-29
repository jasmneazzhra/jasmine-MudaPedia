import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Create Account 🚀</h1>
      <p className="mb-8 text-slate-500">Start managing your portfolio today.</p>
      <RegisterForm />
    </>
  );
}