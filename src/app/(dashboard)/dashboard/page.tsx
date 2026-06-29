import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import DashboardHeader from "@/components/layout/DashboardHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import EmptyState from "@/components/shared/EmptyState";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const portfolios = await Portfolio.find({ userId: session!.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const serialized = JSON.parse(JSON.stringify(portfolios));

  return (
    <section className="space-y-8">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-blue-600">{serialized.length}</p>
          <p className="text-slate-500 text-sm mt-1">Total Projects</p>
        </div>
        <div className="rounded-2xl bg-white border p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-green-600">
            {serialized.filter((p: any) => p.liveUrl).length}
          </p>
          <p className="text-slate-500 text-sm mt-1">Published</p>
        </div>
        <div className="rounded-2xl bg-white border p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-orange-500">
            {serialized.filter((p: any) => p.featured).length}
          </p>
          <p className="text-slate-500 text-sm mt-1">Featured</p>
        </div>
      </div>

      <DashboardHeader />

      {serialized.length === 0 ? (
        <EmptyState />
      ) : (
        <PortfolioGrid portfolios={serialized} />
      )}
    </section>
  );
}