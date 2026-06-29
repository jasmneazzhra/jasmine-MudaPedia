export interface Portfolio {
  _id: string;
  userId: string;

  title: string;
  slug: string;
  description: string;

  technologies: string[];

  category: string;

  githubUrl: string;
  liveUrl: string;

  image: string;

  featured: boolean;

  createdAt: string;
  updatedAt: string;
}