"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

interface FAQ {
    q: string;
    a: string;
}

const FAQS: FAQ[] = [
    {
        q: "What kind of projects do you take on?",
        a: "We build custom software, websites, mobile apps, AI solutions, and automation tools for startups and growing businesses.",
    },
    {
        q: "How do you approach a new engagement?",
        a: "We begin by understanding your goals, then create a clear strategy and build a secure, scalable solution.",
    },
    {
        q: "Can you integrate AI into our existing workflows?",
        a: "Yes. We integrate AI into existing systems through automation, copilots, and intelligent workflows without requiring a complete rebuild.",
    },
    {
        q: "Do you help with visibility, or just the build?",
        a: "Both. We combine engineering with SEO and performance optimization so your product is fast, scalable, and discoverable.",
    },
    {
        q: "What does a typical timeline look like?",
        a: "Most projects move through discovery, design, MVP, and iterative releases so you can see working software early.",
    },
    {
        q: "Do you work with existing development teams?",
        a: "Absolutely. We collaborate with in-house teams, providing expertise where needed while delivering clean, maintainable code.",
    },
];

interface FAQItemProps {
    item: FAQ;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}

function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    const fromLeft = index % 2 === 0;

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // ---------- STACKED CARD LAYOUT (phones + tablets, < lg) ----------
    // Question on top, answer expands directly below it. No fixed widths,
    // so it scales cleanly across every width up to the lg breakpoint.
    const stackedCard = (
        <div
            className={`
        lg:hidden w-full
        bg-gradient-to-br from-zinc-900 to-black
        rounded-2xl border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        transition-colors duration-300
        ${isOpen ? "border-white/40" : ""}
      `}
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left"
            >
                <span
                    className={`
            flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full
            font-mono text-xs
            transition-colors duration-300
            ${isOpen ? "bg-white text-black" : "bg-white/10 text-white/60"}
          `}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex-1 text-sm sm:text-base font-medium leading-snug text-white">
                    {item.q}
                </span>

                <Plus
                    className={`h-5 w-5 flex-shrink-0 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                        }`}
                />
            </button>

            <div
                className={`grid overflow-hidden transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm sm:text-[15px] leading-6 text-zinc-400">
                        {item.a}
                    </p>
                </div>
            </div>
        </div>
    );

    // ---------- WIRE / SIDE-BY-SIDE LAYOUT (large screens, lg and up) ----------

    const questionBox = (
        <button
            onClick={onToggle}
            className={`
        group relative z-10 flex flex-shrink-0 items-center gap-4
        w-80 lg:w-[36rem] xl:w-[46rem]
        min-h-[84px]
        px-6 py-4
        text-left
        bg-gradient-to-br from-zinc-900 to-black
        transition-all duration-300
        hover:from-zinc-800 hover:to-zinc-900
        ${fromLeft
                    ? "rounded-r-3xl border-y border-r border-white/10"
                    : "rounded-l-3xl border-y border-l border-white/10"
                }
        ${isOpen ? "border-white/50" : ""}
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      `}
        >
            <span
                className={`
          flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full
          font-mono text-xs
          transition-colors duration-300
          ${isOpen ? "bg-white text-black" : "bg-white/10 text-white/60"}
        `}
            >
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-base lg:text-lg font-medium leading-snug text-white">
                {item.q}
            </span>
            <span className="flex flex-shrink-0 items-center gap-1.5">
                <span
                    className={`text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${isOpen ? "text-white" : "text-white/50 group-hover:text-white/80"
                        }`}
                >
                    {isOpen ? "Hide" : "View"}
                </span>
                <ArrowRight
                    className={`h-5 w-5 text-white/70 transition-transform duration-300 group-hover:text-white ${fromLeft
                        ? isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        : isOpen
                            ? "rotate-0"
                            : "rotate-180"
                        }`}
                />
            </span>
        </button>
    );

    const connector = (
        <div
            className={`
        flex flex-shrink-0 items-center justify-center self-center
        overflow-visible
        transition-all duration-300 ease-out
        ${isOpen ? "w-14 opacity-100" : "w-0 opacity-0"}
      `}
            style={{ transitionDelay: isOpen ? "0ms" : "150ms" }}
            aria-hidden="true"
        >
            <svg
                width="56"
                height="20"
                viewBox="0 0 56 20"
                className={`overflow-visible ${fromLeft ? "" : "-scale-x-100"}`}
            >
                <circle cx="2" cy="10" r="3.5" className="fill-black/70" />
                <line
                    x1="2"
                    y1="10"
                    x2="44"
                    y2="10"
                    stroke="currentColor"
                    className="text-black/60"
                    strokeWidth="2"
                    strokeDasharray="42"
                    strokeDashoffset={isOpen ? 0 : 42}
                    style={{
                        transition: "stroke-dashoffset 450ms ease-out",
                        transitionDelay: isOpen ? "120ms" : "0ms",
                    }}
                />
                <path
                    d="M42 4 L52 10 L42 16"
                    fill="none"
                    stroke="currentColor"
                    className={`transition-colors duration-300 ${isOpen ? "text-black/80" : "text-black/20"
                        }`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
                />
            </svg>
        </div>
    );

    const answerPanel = (
        <div
            className={`
        overflow-hidden transition-all duration-500 ease-out
        ${isOpen ? "max-w-2xl opacity-100" : "max-w-0 opacity-0"}
      `}
            style={{
                transitionProperty: "max-width, opacity",
                transitionDelay: isOpen ? "150ms" : "0ms",
            }}
        >
            <div
                className={`
          flex h-full items-center
          w-[min(56vw,40rem)] min-h-[84px]
          bg-transparent
          px-6 py-4
          border-y border-black/10
          ${fromLeft ? "rounded-r-3xl border-r" : "rounded-l-3xl border-l"}
        `}
            >
                <p className="text-base leading-7 text-black">
                    {item.a}
                </p>
            </div>
        </div>
    );
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${index * 100}ms` }}
            className={`
        w-full flex flex-col items-center px-4 sm:px-6
        lg:block lg:px-0
        transition-all duration-700 ease-out
        ${visible ? "opacity-100" : "opacity-0"}
        ${visible ? "lg:translate-x-0" : fromLeft ? "lg:-translate-x-24" : "lg:translate-x-24"}
      `}
        >
            {/* Phones + tablets: simple stacked card, answer below question */}
            {stackedCard}

            {/* Large screens: original wire / side-by-side design */}
            <div className={`hidden lg:flex w-full ${fromLeft ? "justify-start" : "justify-end"}`}>
                <div className="flex items-stretch max-w-full">
                    {fromLeft ? (
                        <>
                            {questionBox}
                            {connector}
                            {answerPanel}
                        </>
                    ) : (
                        <>
                            {answerPanel}
                            {connector}
                            {questionBox}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq" className="relative overflow-hidden bg-white py-12 lg:py-16">
            <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full" />

            <div className="relative mb-8 lg:mb-12 text-center px-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/60">
                    FAQ
                </span>

                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-black lg:text-5xl">
                    Frequently Asked Questions</h2>
                <p className="mt-3 text-zinc-500">
                    Everything you need to know before we start building together.
                </p>
            </div>

            <div className="flex flex-col gap-4 lg:gap-5 px-4 sm:px-6 lg:px-0">
                {FAQS.map((item, index) => (
                    <FAQItem
                        key={item.q}
                        item={item}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={() =>
                            setOpenIndex(openIndex === index ? null : index)
                        }
                    />
                ))}
            </div>
        </section>
    );
}