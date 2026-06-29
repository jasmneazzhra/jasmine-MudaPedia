import { Portfolio } from "@/types/portfolio";

type PortfolioResponse = {
  success: boolean;
  data: Portfolio[];
};

export async function getPortfolios() {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/portfolio`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch portfolios");
  }

  const result: PortfolioResponse = await response.json();
  return result.data;
}