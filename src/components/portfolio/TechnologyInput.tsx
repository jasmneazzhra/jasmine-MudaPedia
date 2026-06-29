"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type Props = {
  technologies: string[];
  setTechnologies: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TechnologyInput({ technologies, setTechnologies }: Props) {
  const [value, setValue] = useState("");

  function addTechnology() {
    const tech = value.trim();

    if (!tech) return;

    if (technologies.includes(tech)) {
      setValue("");
      return;
    }

    setTechnologies([...technologies, tech]);
    setValue("");
  }

  function removeTechnology(tech: string) {
    setTechnologies(technologies.filter((item) => item !== tech));
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          name="technology"
          label="Technology"
          value={value}
          placeholder="Next.js"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTechnology();
            }
          }}
        />

        <Button type="button" onClick={addTechnology}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700"
          >
            {tech}

            <button type="button" onClick={() => removeTechnology(tech)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}