"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    q: "What kind of projects do you take on?",
    a: "Everything from custom software builds and mobile apps to AI integrations, business automation, and full digital transformation programs — for startups shipping their first product and enterprises modernizing legacy systems.",
  },
  {
    q: "How do you approach a new engagement?",
    a: "We start by understanding the actual business problem, not just the feature request. That shapes a scoped, secure, and scalable architecture before a single line of code ships.",
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

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: FAQItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 70}ms`,
      }}
      className={`
        transition-all duration-700 ease-out
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
      `}
    >
      <div
        className={`
          overflow-hidden
          rounded-[24px]
          border
          transition-all
          duration-500

          ${
            isOpen
              ? "border-black bg-black text-white"
              : "border-black/10 bg-white text-black hover:border-black/25"
          }
        `}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="
            group
            flex
            w-full
            items-center
            gap-4
            px-5
            py-5
            text-left
            sm:gap-6
            sm:px-7
            sm:py-6
            lg:px-8
          "
        >
          {/* Number */}
          <span
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              font-mono
              text-[10px]
              transition-all
              duration-300

              ${
                isOpen
                  ? "border-white/15 bg-white/10 text-white/60"
                  : "border-black/10 bg-black/[0.03] text-black/45"
              }
            `}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Question */}
          <span
            className="
              flex-1
              text-[16px]
              font-medium
              leading-snug
              tracking-[-0.02em]
              sm:text-[18px]
              lg:text-[20px]
            "
          >
            {item.q}
          </span>

          {/* Plus */}
          <span
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-300

              ${
                isOpen
                  ? "border-white/20 bg-white text-black"
                  : "border-black/10 group-hover:bg-black group-hover:text-white"
              }
            `}
          >
            <Plus
              className={`
                h-4 w-4
                transition-transform
                duration-500
                ${isOpen ? "rotate-45" : "rotate-0"}
              `}
            />
          </span>
        </button>

        {/* Answer */}
        <div
          className={`
            grid
            transition-all
            duration-500
            ease-in-out

            ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >
          <div className="overflow-hidden">
            <div
              className="
                ml-[76px]
                mr-5
                border-t
                border-white/10
                pb-7
                pt-5

                sm:ml-[92px]
                sm:mr-7

                lg:ml-[104px]
                lg:mr-8
              "
            >
              <p
                className="
                  max-w-3xl
                  text-sm
                  leading-7
                  text-white/60
                  sm:text-[15px]
                "
              >
                {item.a}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f7f5]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* subtle glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[400px]
          w-[800px]
          max-w-[90vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-6xl
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* Header */}
        <div
          className="
            mb-12
            grid
            gap-5
            border-b
            border-black/10
            pb-10
            md:grid-cols-[1fr_0.8fr]
            md:items-end
            lg:mb-14
          "
        >
          <div>
            <span
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.24em]
                text-black/40
              "
            >
              06 — FAQ
            </span>

            <h2
              className="
                mt-4
                text-4xl
                font-semibold
                tracking-[-0.05em]
                text-black
                sm:text-5xl
                lg:text-6xl
              "
            >
              Questions,
              <br />
              answered.
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-sm
              leading-6
              text-black/50
              sm:text-base
            "
          >
            Everything you need to know before we start
            building together. Can&apos;t find what you&apos;re
            looking for? Get in touch.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, index) => (
            <FAQItem
              key={item.q}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(
                  openIndex === index ? null : index
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}