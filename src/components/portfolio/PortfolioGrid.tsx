import PortfolioCard from "./PortfolioCard";

type Props = {
  portfolios: any[];
};

export default function PortfolioGrid({
  portfolios,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio._id}
          portfolio={portfolio}
        />
      ))}
    </div>
  );
}