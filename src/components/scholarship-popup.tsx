"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Award } from "lucide-react";
import type { CmsScholarship } from "@/lib/wordpress";
import { useLanguage } from "@/context/LanguageContext";

type ScholarshipPopupProps = {
  scholarships: CmsScholarship[];
};

const SESSION_STORAGE_KEY = "chhetrapal_scholarship_popup_dismissed";

export default function ScholarshipPopup({ scholarships }: ScholarshipPopupProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const isNe = language === "ne";
  
  const hasScholarships = scholarships.length > 0;
  const topScholarships = useMemo(() => scholarships.slice(0, 4), [scholarships]);

  useEffect(() => {
    if (!hasScholarships || pathname !== "/") {
      return;
    }

    const wasDismissed = typeof window !== "undefined" && sessionStorage.getItem(SESSION_STORAGE_KEY) === "1";
    if (wasDismissed) {
      return;
    }

    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, [hasScholarships, pathname]);

  const closePopup = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
    }
  };

  if (!open || !hasScholarships || pathname !== "/") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0f2744]/60 px-4">
      <div className="relative w-full max-w-xl overflow-hidden rounded-md border border-[#1a3a6b]/20 bg-white shadow-2xl">
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          aria-label={isNe ? "बन्द गर्नुहोस्" : "Close scholarship popup"}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-[#1a3a6b] px-6 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
            {isNe ? "छात्रवृत्ति विजेताहरू" : "Scholarship Winners"}
          </p>
          <h2 className="mt-1 text-xl font-extrabold font-nepali">
            {isNe ? "हाम्रा जेहेन्दार विद्यार्थीहरूलाई बधाई" : "Congratulations to Our Achievers"}
          </h2>
        </div>

        <div className="space-y-3 px-6 py-5">
          {topScholarships.map((item) => (
            <div key={`${item.studentName}-${item.year}`} className="rounded-sm border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#e8841a]" />
                <div>
                  <p className="text-sm font-bold text-[#1a3a6b]">{item.studentName}</p>
                  <p className="text-xs font-semibold text-[#e8841a]">{item.scholarshipTitle} ({item.year})</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={closePopup}
            className="rounded-sm border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            {isNe ? "बन्द गर्नुहोस्" : "Close"}
          </button>
          <Link
            href="/scholarships"
            onClick={closePopup}
            className="rounded-sm bg-[#e8841a] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-600"
          >
            {isNe ? "पूर्ण छात्रवृत्ति सूची" : "View Full Scholarship List"}
          </Link>
        </div>
      </div>
    </div>
  );
}
