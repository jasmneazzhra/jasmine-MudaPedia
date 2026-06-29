"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import TechnologyInput from "./TechnologyInput";
import ImageUpload from "@/components/upload/ImageUpload";

type Props = { onSuccess: () => void };

export default function PortfolioForm({ onSuccess }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (technologies.length === 0) {
      alert("Please add at least one technology.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, technologies, githubUrl, liveUrl, image: imageUrl, featured: false }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setTitle(""); setDescription(""); setCategory("Web Development");
      setTechnologies([]); setGithubUrl(""); setLiveUrl(""); setImageUrl("");
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
      <Input label="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Portfolio Manager" />
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
        {loading ? "Saving..." : "Save Portfolio"}
      </Button>
    </form>
  );
}