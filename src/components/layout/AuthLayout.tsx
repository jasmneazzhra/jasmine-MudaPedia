import Card from "../ui/Card";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-2 text-center text-3xl font-bold">
          {title}
        </h1>

        <p className="mb-8 text-center text-slate-500">
          {subtitle}
        </p>

        {children}
      </Card>
    </main>
  );
}