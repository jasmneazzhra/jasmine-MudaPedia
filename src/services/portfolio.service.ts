import Portfolio from "@/models/Portfolio";

type CreatePortfolioData = {
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
};

export async function createPortfolio(
  data: CreatePortfolioData
) {
  const slug = data.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const existingPortfolio = await Portfolio.findOne({
    slug,
  });

  if (existingPortfolio) {
    throw new Error("Portfolio title already exists");
  }

  const portfolio = await Portfolio.create({
    ...data,
    slug,
  });

  return portfolio;
}