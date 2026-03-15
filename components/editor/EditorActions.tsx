"use client";

interface Props {
  onDownload: () => void;
  onUpload: () => void;
  isUploading: boolean;
}

export default function EditorActions({
  onDownload,
  onUpload,
  isUploading,
}: Props) {
  return (
    <div className="flex gap-3 w-full">
      {/* Download Button */}
      <button
        onClick={onDownload}
        className="flex-1 flex items-center justify-center gap-2 bg-[#F5ECD7] text-[#3B1F0A] text-[14px] font-medium font-dm-sans py-3 rounded-2xl hover:bg-[#E5DDD0] transition-colors active:scale-[0.98]"
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7,10 12,15 17,10" />
          <line x1={12} y1={15} x2={12} y2={3} />
        </svg>
        Download
      </button>

      {/* Share to Gallery Button */}
      <button
        onClick={onUpload}
        disabled={isUploading}
        className="flex-1 flex items-center justify-center gap-2 bg-[#E8622A] text-white text-[14px] font-medium font-dm-sans py-3 rounded-2xl hover:bg-[#d4551f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isUploading ? (
          <svg
            className="animate-spin"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx={12} cy={12} r={10} opacity={0.25} />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1={12} y1={2} x2={12} y2={15} />
          </svg>
        )}
        {isUploading ? "Sharing..." : "Share to Gallery"}
      </button>
    </div>
  );
}
