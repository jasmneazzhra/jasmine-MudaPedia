"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import PortfolioEditModal from "./PortfolioEditModal";

type Props = { portfolio: any };

export default function PortfolioCard({ portfolio }: Props) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Hapus portfolio ini?")) return;
    setDeleting(true);
    await fetch(`/api/portfolio/${portfolio._id}`, { method: "DELETE" });
    router.refresh();
    setDeleting(false);
  };

  return (
    <>
      <div className="rounded-2xl border bg-white shadow-sm transition hover:shadow-lg overflow-hidden">
        {portfolio.image && (
          <div className="relative h-40 w-full bg-slate-100">
            <Image src={portfolio.image} alt={portfolio.title} fill className="object-cover" />
          </div>
        )}

        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-bold">{portfolio.title}</h2>
            <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              {portfolio.category}
            </span>
          </div>

          <p className="text-slate-600 text-sm line-clamp-2">{portfolio.description}</p>

          <div className="flex flex-wrap gap-2">
            {portfolio.technologies.map((tech: string) => (
              <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 text-sm">
            {portfolio.githubUrl && (
              <a href={portfolio.githubUrl} target="_blank" className="font-medium text-blue-600 hover:underline">
                GitHub
              </a>
            )}
            {portfolio.liveUrl && (
              <a href={portfolio.liveUrl} target="_blank" className="font-medium text-green-600 hover:underline">
                Live Demo
              </a>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 text-sm" onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-sm text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>

      <PortfolioEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        portfolio={portfolio}
      />
    </>
  );
}