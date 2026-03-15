"use client";

import React, { useRef } from "react";

interface Props {
  onCapture: () => void;
  onFlip: () => void;
  onFilePick: (dataUrl: string) => void;
}

export default function CameraControls({ onCapture, onFlip, onFilePick }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onFilePick(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center justify-center gap-8 py-4">
      {/* Gallery Pick */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-[52px] h-[52px] bg-white rounded-xl border border-[#3B1F0A]/15 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95"
        aria-label="Pick from gallery"
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3B1F0A"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
          <circle cx={8.5} cy={8.5} r={1.5} />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Shutter */}
      <button
        onClick={onCapture}
        className="w-[68px] h-[68px] rounded-full bg-[#E83C28] border-4 border-white shadow-lg flex items-center justify-center active:scale-[1.05] transition-transform"
        aria-label="Capture photo"
      >
        <div className="w-[54px] h-[54px] rounded-full border-2 border-white/40" />
      </button>

      {/* Flip */}
      <button
        onClick={onFlip}
        className="w-[52px] h-[52px] bg-white rounded-xl border border-[#3B1F0A]/15 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-95"
        aria-label="Flip camera"
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3B1F0A"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 4v6h6" />
          <path d="M23 20v-6h-6" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10" />
          <path d="M3.51 15A9 9 0 0 0 18.36 18.36L23 14" />
        </svg>
      </button>
    </div>
  );
}
