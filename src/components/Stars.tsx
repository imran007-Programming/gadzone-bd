export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-gold-500">
      {"★".repeat(Math.round(rating))}<span className="text-[#7e6ba8]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
