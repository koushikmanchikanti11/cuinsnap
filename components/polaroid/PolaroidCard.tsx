import React, { forwardRef } from "react";

interface PolaroidCardProps {
  imageUrl: string;
  tag?: string;
  comment?: string;
  datetime: string;
  rotation?: number;
  size?: "sm" | "md" | "lg";
  skeleton?: boolean;
}

const sizeClasses = {
  sm: "w-[170px]",
  md: "w-[200px]",
  lg: "w-[300px]",
};

const imageSizeClasses = {
  sm: "w-full h-[140px]",
  md: "w-full aspect-square",
  lg: "w-full aspect-square",
};

const PolaroidCard = forwardRef<HTMLDivElement, PolaroidCardProps>(
  (
    {
      imageUrl,
      tag,
      comment,
      datetime,
      rotation = 0,
      size = "md",
      skeleton = false,
    },
    ref
  ) => {
    if (skeleton) {
      return (
        <div
          className={`${sizeClasses[size]} bg-[#FFFEF9] p-2.5 pb-10 rounded-sm shadow-polaroid animate-pulse flex flex-col`}
        >
          <div className={`${imageSizeClasses[size]} bg-[#E5DDD0] rounded-[2px]`} />
          <div className="pt-2 flex flex-col items-center space-y-1.5 w-full">
            <div className="h-2.5 bg-[#E5DDD0] rounded w-1/2" />
            <div className="h-2.5 bg-[#E5DDD0] rounded w-3/4" />
            <div className="h-2 bg-[#E5DDD0] rounded w-1/3" />
            <div className="h-2 bg-[#E5DDD0] rounded w-1/4 mt-1" />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={{ transform: `rotate(${rotation}deg)` }}
        className={`${sizeClasses[size]} bg-[#FFFEF9] p-2.5 pb-10 rounded-sm shadow-polaroid transition-transform duration-200 hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl flex flex-col`}
      >
        <div className={`${imageSizeClasses[size]} overflow-hidden rounded-[2px]`}>
          <img
            src={imageUrl}
            alt={tag ?? "snap"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="pt-2 flex flex-col items-center text-center">
          {tag && (
            <p className="text-[#E8622A] text-[11px] font-medium font-dm-sans">
              {tag}
            </p>
          )}
          {comment && (
            <p className="text-[#3B1F0A] text-[12px] mt-0.5 leading-[1.5] pb-[4px] line-clamp-2 font-dm-sans">
              {comment}
            </p>
          )}
          <p className="text-[rgba(59,31,10,0.4)] text-[10px] mt-1 font-dm-sans">
            {datetime}
          </p>
          <p className="text-[rgba(59,31,10,0.6)] text-[9px] mt-2 font-bold font-dm-sans tracking-widest uppercase">
            cuinsnap
          </p>
        </div>
      </div>
    );
  }
);

PolaroidCard.displayName = "PolaroidCard";

export default PolaroidCard;
