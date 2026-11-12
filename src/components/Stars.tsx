export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-gold-500">
      {"★".repeat(Math.round(rating))}<span className="text-[#6d5570]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
