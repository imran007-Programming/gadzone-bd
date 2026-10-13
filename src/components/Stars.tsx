export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm tracking-tight">
      {"★".repeat(Math.round(rating))}<span className="text-gray-300">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
