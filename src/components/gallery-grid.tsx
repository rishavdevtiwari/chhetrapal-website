"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

const filters = ["All", "Campus", "Classroom", "Events", "Projects", "Sports"];

function classifyItem(title: string): string {
  const normalized = title.toLowerCase();
  if (normalized.includes("class") || normalized.includes("teaching") || normalized.includes("learning")) return "Classroom";
  if (normalized.includes("event") || normalized.includes("assembly") || normalized.includes("sports")) return "Events";
  if (normalized.includes("project")) return "Projects";
  if (normalized.includes("ground") || normalized.includes("sport")) return "Sports";
  return "Campus";
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [filter, setFilter] = useState("All");

  const filteredItems = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => classifyItem(item.title) === filter);
  }, [filter, items]);

  return (
    <>
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`px-4 h-9 rounded-sm text-sm font-medium border ${filter === item ? "bg-[#1a3a6b] text-white border-[#1a3a6b]" : "bg-white text-[#1a3a6b] border-gray-300 hover:bg-blue-50"}`}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <article key={item.src} className="group overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-[#0f2744]/0 transition-colors group-hover:bg-[#0f2744]/20" />
              </div>
              <div className="p-3">
                <h2 className="text-sm font-semibold leading-tight text-[#1a3a6b]">{item.title}</h2>
                <p className="mt-1 text-xs text-gray-500">{classifyItem(item.title)}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-sm border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500 sm:col-span-2 lg:col-span-3 xl:col-span-4">
            No gallery items match this filter.
          </div>
        )}
      </section>
    </>
  );
}
