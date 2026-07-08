"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Download, Search } from "lucide-react";
import NoticeDialog from "./notice-dialog";
import { useLanguage } from "@/context/LanguageContext";

type NoticeItem = {
  title: string;
  date: string;
  type: string;
  link: string;
  content?: string;
  imageUrl?: string;
};

type DownloadItem = {
  title: string;
  href: string;
};

const noticeTypeTranslations: Record<string, string> = {
  Notice: "सूचना",
  Event: "कार्यक्रम",
  Result: "नतिजा",
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

const ITEMS_PER_PAGE = 8;

export default function NoticeBoard({ notices, downloads }: NoticeBoardProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { language } = useLanguage();
  const isNe = language === "ne";

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

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleTypeChange = (val: string) => {
    setType(val);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const paginatedNotices = useMemo(() => {
    return filteredNotices.slice(0, visibleCount);
  }, [filteredNotices, visibleCount]);

  return (
    <div className="grid lg:grid-cols-[1.55fr_1fr] gap-6">
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder={isNe ? "सूचनाहरू खोज्नुहोस्" : "Search notices"}
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-sm text-sm"
            />
          </div>
          <select
            value={type}
            onChange={(event) => handleTypeChange(event.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white"
          >
            <option value="All Types">{isNe ? "सबै प्रकार" : "All Types"}</option>
            <option value="Notice">{isNe ? "सूचना" : "Notice"}</option>
            <option value="Event">{isNe ? "कार्यक्रम" : "Event"}</option>
            <option value="Result">{isNe ? "नतिजा" : "Result"}</option>
          </select>
        </div>

        <div className="divide-y divide-gray-100">
          {paginatedNotices.length > 0 ? (
            paginatedNotices.map((notice) => (
              <article key={`${notice.title}-${notice.date}`} className="px-4 py-4 sm:px-5 sm:py-5 flex items-start gap-3">
                {(() => {
                  const badge = formatNoticeBadge(notice.date);

                  return (
                    <div className="flex w-12 flex-shrink-0 flex-col gap-2">
                      {notice.imageUrl ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-gray-200 bg-gray-100 shadow-sm">
                          <Image src={notice.imageUrl} alt={notice.title} fill className="object-cover" sizes="48px" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-sm bg-[#1a3a6b] text-white shadow-sm">
                          <span className="text-[1rem] font-extrabold leading-none">{badge.day}</span>
                          <span className="text-[0.55rem] uppercase tracking-widest leading-none">{badge.month}</span>
                        </div>
                      )}
                    </div>
                  );
                })()}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                    <h2
                      onClick={() => {
                        const isDownload = notice.link.includes(".pdf") || notice.link.includes(".doc") || notice.link.includes(".zip");
                        if (isDownload) {
                          window.open(notice.link, "_blank", "noopener,noreferrer");
                        } else {
                          setSelectedNotice(notice);
                        }
                      }}
                      className="text-[0.98rem] font-semibold leading-snug text-[#1a3a6b] hover:text-[#e8841a] cursor-pointer transition-colors"
                    >
                      {notice.title}
                    </h2>
                    <span className="rounded-sm bg-blue-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">
                      {isNe ? noticeTypeTranslations[notice.type] || notice.type : notice.type}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{isNe ? "प्रकाशित मिति: " : "Published: "}{notice.date}</p>
                  <button
                    onClick={() => {
                      const isDownload = notice.link.includes(".pdf") || notice.link.includes(".doc") || notice.link.includes(".zip");
                      if (isDownload) {
                        window.open(notice.link, "_blank", "noopener,noreferrer");
                      } else {
                        setSelectedNotice(notice);
                      }
                    }}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#e8841a] hover:underline cursor-pointer bg-transparent border-none p-0"
                  >
                    <Download className="h-4 w-4" /> {isNe ? "सूचना खोल्नुहोस्" : "Open notice"}
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="p-6 text-sm text-gray-500">
              {isNe ? "तपाईंको खोजसँग मिल्ने कुनै सूचनाहरू फेला परेनन्।" : "No notices match your search."}
            </div>
          )}
        </div>

        {filteredNotices.length > visibleCount && (
          <div className="p-4 border-t border-gray-100 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-4 py-2.5 border border-gray-300 hover:border-[#1a3a6b] rounded-sm text-xs font-semibold text-[#1a3a6b] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
            >
              {isNe ? "थप सूचनाहरू लोड गर्नुहोस्" : "Load More Notices"}
            </button>
          </div>
        )}
      </section>

      <aside className="space-y-6">
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{isNe ? "सूचना सबस्क्राइब" : "Subscribe to Notices"}</h2>
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
            <input name="name" type="text" placeholder={isNe ? "पूरा नाम" : "Full Name"} className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
            <input name="email" type="email" placeholder={isNe ? "इमेल ठेगाना" : "Email Address"} className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
            <select name="category" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
              <option>{isNe ? "रुचाइएको सूचना प्रकार" : "Preferred Notice Type"}</option>
              <option value="All">{isNe ? "सबै" : "All"}</option>
              <option value="Event">{isNe ? "कार्यक्रम" : "Event"}</option>
              <option value="Notice">{isNe ? "सूचना" : "Notice"}</option>
              <option value="Result">{isNe ? "नतिजा" : "Result"}</option>
            </select>
            <button type="submit" className="w-full h-10 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
              {isNe ? "सबस्क्राइब गर्नुहोस्" : "Subscribe"}
            </button>
          </form>
        </section>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-4">
          <h2 className="section-title">{isNe ? "डाउनलोड क्षेत्र" : "Download Corner"}</h2>
          <ul className="space-y-2 text-sm">
            {downloads.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-sm border border-gray-200 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#1a3a6b] transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </aside>
      <NoticeDialog
        isOpen={selectedNotice !== null}
        onClose={() => setSelectedNotice(null)}
        notice={selectedNotice}
      />
    </div>
  );
}
