"use client";

import { useRef, useState } from "react";
import ImagePreview from "./ImagePreview";

type ImageUploadProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageUpload({ image, setImage }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.message || "Upload failed");
        return;
      }

      setImage(result.imageUrl);
    } catch {
      setError("Something went wrong while uploading.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
      />

      {uploading && <p className="text-sm text-slate-500">Uploading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <ImagePreview image={image} />
    </div>
  );
}