export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-gold-500">
      {"★".repeat(Math.round(rating))}<span className="text-[#3f6b66]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
