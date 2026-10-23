export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-teal-400">
      {"★".repeat(Math.round(rating))}<span className="text-[#8a6a4d]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
