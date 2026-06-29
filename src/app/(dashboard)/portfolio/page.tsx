import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import DashboardHeader from "@/components/layout/DashboardHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import EmptyState from "@/components/shared/EmptyState";

export default async function PortfolioPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const portfolios = await Portfolio.find({ userId: session!.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const serialized = JSON.parse(JSON.stringify(portfolios));

  return (
    <section className="space-y-8">
      <DashboardHeader />
      {serialized.length === 0 ? (
        <EmptyState />
      ) : (
        <PortfolioGrid portfolios={serialized} />
      )}
    </section>
  );
}