export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-orange-400">
      {"★".repeat(Math.round(rating))}<span className="text-[#8a7a66]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
