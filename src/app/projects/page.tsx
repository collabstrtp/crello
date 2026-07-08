"use client";

import { useState } from "react";
import Image from "next/image";
//import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  href: string;
  large?: boolean;
}

const projects: Project[] = [
  {
    id: "wa-solutions",
    title: "WA Solutions",
    category: "Logistics",
    tags: [
      "Web UX/UI Design",
      "Brand Guidelines",
      "Collateral",
      "Web Development",
    ],
    description:
      "An inventory management platform built to cut carrying costs, streamline field-team workflows, and eliminate waste caused by inefficiency.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "fcf",
    title: "FCF",
    category: "Sports & Entertainment",
    tags: [
      "Branding",
      "Product Design",
      "Web UX/UI Design",
      "Web Development",
    ],
    description:
      "A fan-controlled football league where every decision — team name, jerseys, plays — is made by the crowd.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop",
    href: "#",
    large: true,
  },
  {
    id: "euc",
    title: "EUC",
    category: "Human Resources",
    tags: [
      "Branding",
      "Product Design",
      "Design System",
      "Engineering",
    ],
    description:
      "A refreshed visual identity, marketing site, and scalable portal interface for an emerging leader in the personal benefits marketplace.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "packagex",
    title: "PackageX",
    category: "Logistics",
    tags: [
      "Product Design",
      "Design System",
      "App Development",
    ],
    description:
      "A unified platform connecting inventory, fulfillment, shipping, and receiving for retailers, warehouses, and commercial buildings.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
      {children}
    </span>
  );
}
function ImagePanel({ project }: { project: Project }) {
  return (
    <div className="relative h-[620px] overflow-hidden rounded-3xl">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition duration-700 hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="absolute bottom-10 left-10">
        <h2 className="text-4xl font-bold text-white">
          {project.title}
        </h2>

        <p className="mt-2 text-white/80">
          {project.category}
        </p>
      </div>
    </div>
  );
}
function InfoPanel({ project }: { project: Project }) {
  return (
    <div className="max-w-md rounded-3xl bg-white p-10 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
        {project.category}
      </span>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="my-8 h-px bg-neutral-200" />

      <p className="leading-8 text-neutral-600">
        {project.description}
      </p>

      <a
        href={project.href}
        className="mt-8 inline-flex items-center text-sm font-semibold"
      >
        View Case Study →
      </a>
    </div>
  );
}
function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  if (project.large) {
    return (
      <section className="py-12">
        <ImagePanel project={project} />
      </section>
    );
  }

  const reverse = index % 2 !== 0;

  return (
    <section
      className={`grid items-center gap-20 py-12 ${reverse
        ? "lg:grid-cols-[320px_1fr]"
        : "lg:grid-cols-[1fr_320px]"
        }`}
    >
      {reverse ? (
        <>
          <InfoPanel project={project} />
          <ImagePanel project={project} />
        </>
      ) : (
        <>
          <ImagePanel project={project} />
          <InfoPanel project={project} />
        </>
      )}
    </section>
  );
}
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category)),
  ];

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto max-w-7xl px-6 pb-12 pt-10 md:pt-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Case Studies
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl">
          Projects that inspire our industry.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-neutral-600">
          We create beautiful, functional, technology-forward work that
          elevates and unifies our clients&apos; products.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === cat
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1700px] px-10 pb-24">        {filtered.map((project, index) => (
        <ProjectRow
          key={project.id}
          project={project}
          index={index}
        />
      ))}
      </main>
    </div>
  );
}