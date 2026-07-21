"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Calendar, Download, Tag, FileText, ChevronRight } from "lucide-react";
import type { CmsNotice } from "@/lib/wordpress";

type NoticeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialNotice: CmsNotice | null;
  allNotices: CmsNotice[];
};

export default function NoticeModal({
  isOpen,
  onClose,
  initialNotice,
  allNotices,
}: NoticeModalProps) {
  const [selectedNotice, setSelectedNotice] = useState<CmsNotice | null>(initialNotice);

  useEffect(() => {
    if (initialNotice) {
      setSelectedNotice(initialNotice);
    } else if (allNotices.length > 0) {
      setSelectedNotice(allNotices[0]);
    }
  }, [initialNotice, allNotices]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const activeNotice = selectedNotice || allNotices[0];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Event":
        return "bg-green-100 text-green-800 border-green-200";
      case "Result":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-200">
        {/* Header */}
        <div className="bg-[#1a3a6b] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e8841a] rounded-md text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Notice & Announcement Details</h2>
              <p className="text-xs text-blue-200">Official Notice Board • Chhetrapal Secondary School</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto grid md:grid-cols-[1.6fr_1fr] divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* Main Notice Viewer */}
          <div className="p-6 space-y-6">
            {activeNotice ? (
              <>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded border ${getTagColor(
                        activeNotice.tag
                      )}`}
                    >
                      <Tag className="h-3 w-3" />
                      {activeNotice.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium bg-gray-100 px-2.5 py-1 rounded">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      Published: {activeNotice.date.month} {activeNotice.date.day}
                    </span>
                    {activeNotice.showInScroller && (
                      <span className="inline-flex items-center text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ✹ Marquee Scroller
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl md:text-2xl font-bold text-[#1a3a6b] leading-tight">
                    {activeNotice.title}
                  </h1>
                </div>

                {activeNotice.imageUrl && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                    <Image
                      src={activeNotice.imageUrl}
                      alt={activeNotice.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                )}

                <div className="prose prose-sm max-w-none text-gray-700 space-y-3 leading-relaxed">
                  {activeNotice.content ? (
                    <div dangerouslySetInnerHTML={{ __html: activeNotice.content }} />
                  ) : activeNotice.summary ? (
                    <p className="text-base text-gray-600 bg-blue-50/50 p-4 rounded-md border border-blue-100">
                      {activeNotice.summary}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Please contact the school administration or visit the notice board section for additional details regarding this notice.
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  {activeNotice.link && (
                    <Link
                      href={activeNotice.link}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8841a] text-white text-sm font-semibold rounded hover:bg-orange-600 transition-colors shadow-xs"
                    >
                      <Download className="h-4 w-4" /> Open Notice Document
                    </Link>
                  )}
                  <Link
                    href="/notices"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a6b] hover:underline ml-auto"
                  >
                    View All Notices Page <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">No notice selected.</div>
            )}
          </div>

          {/* List of All Notices Side Panel */}
          <div className="bg-gray-50/60 p-4 space-y-3 flex flex-col">
            <div className="flex items-center justify-between px-2 py-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a3a6b]">
                All Notices ({allNotices.length})
              </h3>
              <span className="text-[11px] text-gray-500">Click to preview</span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[420px] pr-1">
              {allNotices.map((notice, idx) => {
                const isActive = activeNotice?.title === notice.title;

                return (
                  <button
                    key={`${notice.title}-${idx}`}
                    onClick={() => setSelectedNotice(notice)}
                    className={`w-full text-left p-3 rounded-md border text-sm transition-all flex items-start gap-3 ${
                      isActive
                        ? "bg-white border-[#1a3a6b] shadow-xs text-[#1a3a6b]"
                        : "bg-white/70 border-gray-200 hover:bg-white hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded flex flex-col items-center justify-center text-xs font-extrabold leading-none ${
                        isActive ? "bg-[#1a3a6b] text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span>{notice.date.day}</span>
                      <span className="text-[0.55rem] uppercase">{notice.date.month}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getTagColor(
                            notice.tag
                          )}`}
                        >
                          {notice.tag}
                        </span>
                        {notice.showInScroller && (
                          <span className="text-[10px] text-amber-600 font-semibold">✹ Marquee</span>
                        )}
                      </div>
                      <p className="mt-1 font-medium leading-snug line-clamp-2 text-xs">
                        {notice.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-3 border-t border-gray-200 text-center">
              <Link
                href="/notices"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1a3a6b] text-white rounded text-xs font-semibold hover:bg-[#0f2744] transition-colors"
              >
                Go to Full Notice Board Page <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
