"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import TechnologyInput from "./TechnologyInput";
import ImageUpload from "@/components/upload/ImageUpload";
import type { Portfolio } from "@/types/portfolio";

type Props = { portfolio: Portfolio; onSuccess: () => void };

export default function PortfolioEditForm({ portfolio, onSuccess }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(portfolio.title);
  const [description, setDescription] = useState(portfolio.description);
  const [category, setCategory] = useState(portfolio.category);
  const [technologies, setTechnologies] = useState<string[]>(portfolio.technologies);
  const [githubUrl, setGithubUrl] = useState(portfolio.githubUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(portfolio.liveUrl ?? "");
  const [imageUrl, setImageUrl] = useState(portfolio.image ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/portfolio/${portfolio._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, technologies, githubUrl, liveUrl, image: imageUrl }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.refresh();
      onSuccess();
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Portfolio title" />
      <TextArea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your project..." />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Web Development</option>
        <option>Mobile Development</option>
        <option>UI/UX Design</option>
        <option>Machine Learning</option>
        <option>Data Science</option>
      </Select>
      <TechnologyInput technologies={technologies} setTechnologies={setTechnologies} />
      <Input label="Github URL" name="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
      <Input label="Live URL" name="liveUrl" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://yourproject.com" />
      <div>
        <label className="mb-2 block font-medium">Project Image</label>
        <ImageUpload image={imageUrl} setImage={setImageUrl} />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}