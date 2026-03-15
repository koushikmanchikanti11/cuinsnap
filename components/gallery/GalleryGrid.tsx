"use client";

import PolaroidCard from "@/components/polaroid/PolaroidCard";
import { formatDateTime } from "@/lib/utils";

interface Snap {
  id: string;
  imageUrl: string;
  tag: string | null;
  comment: string | null;
  createdAt: string;
}

interface Props {
  snaps: Snap[];
}

function getRotation(id: string): number {
  // Generate a stable rotation from the snap ID
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Map to -3 to +3 degrees
  return ((hash % 60) / 10) - 3;
}

export default function GalleryGrid({ snaps }: Props) {
  if (snaps.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {snaps.map((snap) => (
        <div key={snap.id} className="flex justify-center">
          <PolaroidCard
            imageUrl={snap.imageUrl}
            tag={snap.tag ?? undefined}
            comment={snap.comment ?? undefined}
            datetime={formatDateTime(snap.createdAt)}
            rotation={getRotation(snap.id)}
            size="sm"
          />
        </div>
      ))}
    </div>
  );
}
