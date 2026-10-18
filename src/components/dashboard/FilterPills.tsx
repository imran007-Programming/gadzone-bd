"use client";

type FilterPillsProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  counts?: Record<string, number>;
};

export default function FilterPills({ options, value, onChange, counts }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              active ? "bg-[#eaf0fa] text-white shadow-sm" : "bg-[#101a30] text-[#55606f] ring-1 ring-[#22304d] hover:bg-[#0d1528]"
            }`}
          >
            {opt}
            {counts && counts[opt] !== undefined && (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-[#101a30]/20 text-white" : "bg-[#0d1528] text-[#6f6a5c]"}`}>
                {counts[opt]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
