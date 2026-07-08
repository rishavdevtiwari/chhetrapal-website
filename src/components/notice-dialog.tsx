"use client";

import { useEffect } from "react";
import { X, Calendar } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

type NoticeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  notice: {
    title: string;
    date: string;
    type: string;
    content?: string;
    imageUrl?: string;
  } | null;
};

const noticeTypeTranslations: Record<string, string> = {
  Notice: "सूचना",
  Event: "कार्यक्रम",
  Result: "नतिजा",
};

export default function NoticeDialog({ isOpen, onClose, notice }: NoticeDialogProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f2744]/70 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-md border border-[#1a3a6b]/20 bg-white shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <header className="bg-[#1a3a6b] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <span className="rounded-sm bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
              {isNe ? noticeTypeTranslations[notice.type] || notice.type : notice.type}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-orange-200 font-semibold">
              <Calendar className="h-3.5 w-3.5" /> {isNe ? "प्रकाशित मिति: " : "Published: "}{notice.date}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/20 cursor-pointer"
            aria-label={isNe ? "बन्द गर्नुहोस्" : "Close dialog"}
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#1a3a6b] leading-tight">
            {notice.title}
          </h2>

          {notice.imageUrl && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-gray-200 bg-gray-50">
              <Image
                src={notice.imageUrl}
                alt={notice.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          )}

          <div 
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-sm pt-2"
            dangerouslySetInnerHTML={{ __html: notice.content || notice.title }}
          />
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-150 bg-gray-50 px-6 py-3.5 flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm bg-[#1a3a6b] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0f2744] cursor-pointer"
          >
            {isNe ? "सूचना बन्द गर्नुहोस्" : "Close Notice"}
          </button>
        </footer>

      </div>
    </div>
  );
}
