import { Suspense } from "react";
import Link from "next/link";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PolaroidCard from "@/components/polaroid/PolaroidCard";

interface Snap {
  id: string;
  imageUrl: string;
  tag: string | null;
  comment: string | null;
  createdAt: string;
}

async function getSnaps(): Promise<Snap[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/snaps`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex justify-center">
          <PolaroidCard
            imageUrl=""
            datetime=""
            size="sm"
            skeleton={true}
          />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl mb-4">📸</div>
      <h2 className="font-playfair text-[22px] font-bold text-[#3B1F0A] mb-2">
        No snaps yet
      </h2>
      <p className="text-[#3B1F0A]/50 text-[14px] font-dm-sans mb-6">
        Be the first to share!
      </p>
      <Link
        href="/camera"
        className="bg-[#E8622A] text-white text-[14px] font-medium font-dm-sans px-6 py-2.5 rounded-2xl hover:bg-[#d4551f] transition-colors"
      >
        Take a Snap →
      </Link>
    </div>
  );
}

async function GalleryContent() {
  const snaps = await getSnaps();

  if (snaps.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-playfair text-[28px] sm:text-[32px] font-bold text-[#3B1F0A]">
          Gallery
        </h1>
        <span className="text-[#3B1F0A]/40 text-[13px] font-dm-sans">
          {snaps.length} snap{snaps.length !== 1 ? "s" : ""}
        </span>
      </div>
      <GalleryGrid snaps={snaps} />
    </>
  );
}

export default function GalleryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 w-full py-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[#3B1F0A]/60 text-[13px] font-dm-sans mb-4 hover:text-[#3B1F0A] transition-colors"
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
        Home
      </Link>

      <Suspense fallback={<GallerySkeleton />}>
        <GalleryContent />
      </Suspense>
    </div>
  );
}
