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

export async function createPortfolio(data: CreatePortfolioData) {
  const slug =
    data.title.toLowerCase().trim().replace(/\s+/g, "-") +
    "-" +
    Date.now();

  const portfolio = await Portfolio.create({ ...data, slug });
  return portfolio;
}

export async function getPortfoliosByUser(userId: string) {
  return Portfolio.find({ userId }).sort({ createdAt: -1 });
}

export async function getPortfolios() {
  return Portfolio.find().sort({ createdAt: -1 });
}