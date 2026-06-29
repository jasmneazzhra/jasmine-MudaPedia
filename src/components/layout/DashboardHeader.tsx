"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import PortfolioModal from "@/components/portfolio/PortfolioModal";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Portfolio
          </h1>

          <p className="text-slate-500">
            Manage all your projects here.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          + Add Portfolio
        </Button>
      </div>

      <PortfolioModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}