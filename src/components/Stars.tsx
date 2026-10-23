export default function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-base leading-none text-teal-400">
      {"★".repeat(Math.round(rating))}<span className="text-[#a3908f]">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}
