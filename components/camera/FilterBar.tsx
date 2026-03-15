"use client";

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FILTERS = [
  { label: "None", value: "none" },
  { label: "B&W", value: "grayscale(1)" },
  { label: "Warm", value: "sepia(0.4) saturate(1.3) hue-rotate(-10deg)" },
  { label: "Cool", value: "saturate(0.85) hue-rotate(20deg) brightness(1.05)" },
  { label: "Sepia", value: "sepia(0.8)" },
  { label: "Retro", value: "sepia(0.3) contrast(1.1) saturate(1.2) brightness(0.95)" },
];

export default function FilterBar({ activeFilter, onFilterChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2 px-1">
      {FILTERS.map((filter) => (
        <button
          key={filter.label}
          onClick={() => onFilterChange(filter.value)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-2xl text-[12px] font-medium font-dm-sans transition-colors duration-200 ${
            activeFilter === filter.value
              ? "bg-[#3B1F0A] text-[#FDF6EC]"
              : "bg-white border border-[#3B1F0A]/15 text-[#3B1F0A]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export { FILTERS };
