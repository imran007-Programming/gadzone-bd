export default function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white shadow-xl">{message}</div>
  );
}
