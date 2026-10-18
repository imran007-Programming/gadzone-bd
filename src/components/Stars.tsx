export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-amber-400">
      {"★".repeat(Math.round(rating))}<span className="text-[#6f6a5c]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
