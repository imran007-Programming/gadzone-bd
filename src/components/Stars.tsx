export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-gold-500">
      {"★".repeat(Math.round(rating))}<span className="text-[#7c4a55]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
