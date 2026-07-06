import { getHomepageCmsData } from "@/lib/wordpress";
import NoticeBoard from "@/components/notice-board";
import { cookies } from "next/headers";
import { translations, TranslationKey } from "@/lib/translations";
import { Language, getSafeLanguage } from "@/lib/language";

const noticesEn = [
  { title: "Admission Notice for AY 2083", date: "2083-01-10", type: "Notice" },
  { title: "First Terminal Examination Routine", date: "2083-01-14", type: "Routine" },
  { title: "Scholarship Form Submission Deadline", date: "2083-01-18", type: "Announcement" },
  { title: "Parent-Teacher Meeting Schedule", date: "2083-01-20", type: "Notice" },
  { title: "SEE Preparation Class Timetable", date: "2083-01-25", type: "Routine" },
];

const noticesNe = [
  { title: "शैक्षिक सत्र २०८३ को लागि भर्ना सूचना", date: "२०८३-०१-१०", type: "Notice" },
  { title: "प्रथम त्रैमासिक परीक्षा तालिका", date: "२०८३-०१-१४", type: "Routine" },
  { title: "छात्रवृत्ति फारम बुझाउने अन्तिम मिति", date: "२०८३-०१-१८", type: "Announcement" },
  { title: "अभिभावक-शिक्षक बैठकको तालिका", date: "२०८३-०१-२०", type: "Notice" },
  { title: "एसईई तयारी कक्षाको समय तालिका", date: "२०८३-०१-२५", type: "Routine" },
];

export const dynamic = "force-dynamic";

const translateMonth = (month: string, isNe: boolean) => {
  if (!isNe) return month;
  const months: Record<string, string> = {
    Jan: "जनवरी", Feb: "फेब्रुअरी", Mar: "मार्च", Apr: "अप्रिल", May: "मे", Jun: "जुन",
    Jul: "जुलाई", Aug: "अगस्त", Sep: "सेप्टेम्बर", Oct: "अक्टोबर", Nov: "नोभेम्बर", Dec: "डिसेम्बर",
    Baisakh: "बैशाख", Jestha: "जेठ", Ashadh: "असार", Shrawan: "साउन", Bhadra: "भदौ", Ashwin: "असोज",
    Kartik: "कार्तिक", Mangsir: "मंसिर", Poush: "पुस", Magh: "माघ", Falgun: "फागुन", Chaitra: "चैत"
  };
  return months[month] || month;
};

export default async function NoticesPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const fallbackNotices = isNe ? noticesNe : noticesEn;

  const noticeItems = cmsData?.notices?.length
    ? cmsData.notices.map((notice) => ({
        title: notice.title,
        date: `${translateMonth(notice.date.month, isNe)} ${notice.date.day}`,
        type: notice.tag === "Notice" && isNe ? "सूचना" : notice.tag === "Event" && isNe ? "कार्यक्रम" : notice.tag === "Result" && isNe ? "नतिजा" : notice.tag,
        link: notice.link || "#",
        imageUrl: notice.imageUrl,
        content: notice.content,
      }))
    : fallbackNotices.map((notice) => ({
        ...notice,
        link: "#",
      }));

  const downloadItems = cmsData?.downloads?.length
    ? cmsData.downloads.map((download) => ({
        title: download.title,
        href: download.fileUrl || "#",
      }))
    : [
        { title: isNe ? "विद्यालय पुस्तिका (Prospectus)" : "School Prospectus", href: "#" },
        { title: isNe ? "वार्षिक शैक्षिक क्यालेन्डर" : "Annual Calendar", href: "#" },
        { title: isNe ? "भर्ना आवेदन फारम" : "Admission Form", href: "#" },
        { title: isNe ? "छात्रवृत्ति निर्देशिका" : "Scholarship Guidelines", href: "#" },
      ];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">{t("notices")}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "सूचना तथा परिपत्रहरू" : "Notices and Circulars"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "विद्यालयका नयाँ सूचनाहरू, परीक्षा तालिका, र कार्यक्रमहरूको विवरण।"
              : "Latest school notices, exam routines, results, and administrative announcements."}
          </p>
        </div>
      </section>

      <div className="page-container page-section">
        <NoticeBoard notices={noticeItems} downloads={downloadItems} />
      </div>
    </div>
  );
}
