"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, Download, Search } from "lucide-react";

type NoticeItem = {
  title: string;
  date: string;
  type: string;
  link: string;
};

type DownloadItem = {
  title: string;
  href: string;
};

function formatNoticeBadge(dateLabel: string): { day: string; month: string } {
  const dateParts = dateLabel.trim().split(/\s+/);
  if (dateParts.length >= 2) {
    return { month: dateParts[0], day: dateParts[1] };
  }

  const fallbackParts = dateLabel.split("-");
  if (fallbackParts.length === 3) {
    return { month: fallbackParts[1], day: fallbackParts[2] };
  }

  return { month: dateLabel.slice(0, 3).toUpperCase(), day: dateLabel.slice(-2) || "--" };
}

type NoticeBoardProps = {
  notices: NoticeItem[];
  downloads: DownloadItem[];
};

export default function NoticeBoard({ notices, downloads }: NoticeBoardProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");

  const filteredNotices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return notices.filter((notice) => {
      const matchesQuery =
        !normalizedQuery ||
        notice.title.toLowerCase().includes(normalizedQuery) ||
        notice.date.toLowerCase().includes(normalizedQuery) ||
        notice.type.toLowerCase().includes(normalizedQuery);
      const matchesType = type === "All Types" || notice.type === type;
      return matchesQuery && matchesType;
    });
  }, [notices, query, type]);

  return (
    <div className="grid lg:grid-cols-[1.55fr_1fr] gap-6">
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notices"
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-sm text-sm"
            />
          </div>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white"
          >
            <option>All Types</option>
            <option>Notice</option>
            <option>Event</option>
            <option>Result</option>
          </select>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <article key={`${notice.title}-${notice.date}`} className="px-4 py-4 sm:px-5 sm:py-5 flex items-start gap-3">
                {(() => {
                  const badge = formatNoticeBadge(notice.date);

                  return (
                    <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-sm bg-[#1a3a6b] text-white shadow-sm">
                      <span className="text-[1rem] font-extrabold leading-none">{badge.day}</span>
                      <span className="text-[0.55rem] uppercase tracking-widest leading-none">{badge.month}</span>
                    </div>
                  );
                })()}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                    <h2 className="text-[0.98rem] font-semibold leading-snug text-[#1a3a6b]">{notice.title}</h2>
                    <span className="rounded-sm bg-blue-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">
                      {notice.type}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Published: {notice.date}</p>
                  <Link href={notice.link} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#e8841a] hover:underline">
                    <Download className="h-4 w-4" /> Open notice
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="p-6 text-sm text-gray-500">
              No notices match your search.
            </div>
          )}
        </div>
      </section>

      <aside className="space-y-6">
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">Subscribe to Notices</h2>
          </div>
          <form
            className="p-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const name = String(formData.get("name") || "");
              const email = String(formData.get("email") || "");
              const category = String(formData.get("category") || "");
              const subject = encodeURIComponent(`Notice subscription: ${category || "All"}`);
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPreferred type: ${category || "All"}`);
              window.location.href = `mailto:info@chhetrapalschool.edu.np?subject=${subject}&body=${body}`;
            }}
          >
            <input name="name" type="text" placeholder="Full Name" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
            <input name="email" type="email" placeholder="Email Address" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
            <select name="category" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
              <option>Preferred Notice Type</option>
              <option>All</option>
              <option>Event</option>
              <option>Notice</option>
              <option>Result</option>
            </select>
            <button type="submit" className="w-full h-10 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </form>
        </section>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-4">
          <h2 className="section-title">Download Corner</h2>
          <ul className="space-y-2 text-sm">
            {downloads.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="block w-full rounded-sm border border-gray-200 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#1a3a6b]">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
