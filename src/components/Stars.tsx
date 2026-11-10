export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-gold-500">
      {"★".repeat(Math.round(rating))}<span className="text-[#6b5b7d]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
