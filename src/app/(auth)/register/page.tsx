import RegisterForm from "@/components/auth/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing your portfolio today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}