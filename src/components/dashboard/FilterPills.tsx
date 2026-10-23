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
              active ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white font-black shadow-[0_0_18px_-4px_rgba(59,98,246, 0.7)]" : "bg-[#ffffff] text-[#6f7891] ring-1 ring-[#1d2a4a] hover:bg-[#ffffff]"
            }`}
          >
            {opt}
            {counts && counts[opt] !== undefined && (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-[#ffffff]/20 text-white" : "bg-[#ffffff] text-[#6f7891]"}`}>
                {counts[opt]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
