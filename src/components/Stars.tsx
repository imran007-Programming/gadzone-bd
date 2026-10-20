export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-orange-400">
      {"★".repeat(Math.round(rating))}<span className="text-[#8fa6b5]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
