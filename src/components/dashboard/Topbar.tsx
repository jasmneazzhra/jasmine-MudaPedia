export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
        J
      </div>
    </header>
  );
}