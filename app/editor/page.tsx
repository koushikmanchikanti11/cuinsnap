"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PolaroidCard from "@/components/polaroid/PolaroidCard";
import EditorForm from "@/components/editor/EditorForm";
import EditorActions from "@/components/editor/EditorActions";
import html2canvas from "html2canvas";
import { formatDateTime } from "@/lib/utils";

export default function EditorPage() {
  const router = useRouter();
  const polaroidRef = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");
  const [datetime, setDatetime] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const pending = sessionStorage.getItem("cuinsnap_pending");
    if (!pending) {
      router.push("/camera");
      return;
    }
    setImageData(pending);
    setDatetime(formatDateTime(new Date()));
  }, [router]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  const handleDownload = async () => {
    const el = polaroidRef.current;
    if (!el) return;

    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `cuinsnap_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("📥 Downloaded!");
    } catch (err) {
      console.error("Download error:", err);
      showToast("❌ Download failed");
    }
  };

  const handleUpload = async () => {
    if (!imageData) return;

    setIsUploading(true);
    try {
      const res = await fetch("/api/snaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imageData,
          tag: tag.trim() || null,
          comment: comment.trim() || null,
        }),
      });

      if (!res.ok) throw new Error("Upload failed");

      sessionStorage.removeItem("cuinsnap_pending");
      showToast("🎉 Shared to gallery!");
      setTimeout(() => router.push("/gallery"), 600);
    } catch (err) {
      console.error("Upload error:", err);
      showToast("❌ Share failed. Try again.");
      setIsUploading(false);
    }
  };

  if (!imageData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#3B1F0A]/40 text-[14px] font-dm-sans">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto px-4 w-full py-4 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#3B1F0A] text-[#FDF6EC] text-[13px] font-dm-sans px-5 py-2.5 rounded-2xl shadow-lg animate-slideUp">
          {toast}
        </div>
      )}

      {/* Back / Retake */}
      <Link
        href="/camera"
        className="inline-flex items-center gap-1.5 text-[#3B1F0A]/60 text-[13px] font-dm-sans mb-6 hover:text-[#3B1F0A] transition-colors"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        ← Retake
      </Link>

      {/* Polaroid Live Preview */}
      <div className="flex justify-center mb-6">
        <PolaroidCard
          ref={polaroidRef}
          imageUrl={imageData}
          tag={tag || undefined}
          comment={comment || undefined}
          datetime={datetime}
          size="lg"
        />
      </div>

      {/* Editor Form */}
      <div className="mb-6">
        <EditorForm
          tag={tag}
          comment={comment}
          onTagChange={setTag}
          onCommentChange={setComment}
        />
      </div>

      {/* Actions */}
      <EditorActions
        onDownload={handleDownload}
        onUpload={handleUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
