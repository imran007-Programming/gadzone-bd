"use client";

const FAQS = [
  { q: "Cash on Delivery ki available?", a: "Ha! Puro Bangladesh-e Cash on Delivery available. Product hate peye tarpor payment korben." },
  { q: "Delivery koto din lage?", a: "Dhakar vitore 24–48 ghonta, Dhakar baire 2–4 working days. Sob order-e tracking deya hoy." },
  { q: "Warranty ache?", a: "Ha, sob product-e minimum 7 diner replacement warranty ache. Kichu product-e 6–12 masher service warranty ache." },
  { q: "Return / exchange kora jabe?", a: "Product-e problem thakle delivery-r 7 diner moddhe easy return ba exchange kora jabe." },
  { q: "bKash / Nagad diye payment kora jabe?", a: "Ha — bKash, Nagad, Card ebong Cash on Delivery — sob payment method accepted." },
];

type FaqSectionProps = {
  openFaq: number | null;
  onToggleFaq: (index: number | null) => void;
};

export default function FaqSection({ openFaq, onToggleFaq }: FaqSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-black">❓ Frequently Asked Questions</h2>
      <div className="mt-5 space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-gray-100">
            <button onClick={() => onToggleFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left font-bold">{f.q}<span>{openFaq === i ? "−" : "+"}</span></button>
            {openFaq === i && <p className="bg-gray-50 px-5 pb-4 pt-1 text-sm text-gray-600">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
