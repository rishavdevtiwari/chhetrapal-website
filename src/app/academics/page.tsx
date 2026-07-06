import { BookOpen, FlaskConical, Monitor, PenSquare, FileText } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { translations, Language, TranslationKey, getSafeLanguage } from "@/context/LanguageContext";

const programs = [
  {
    id: "primary",
    title: "Primary Level (Class 1-5)",
    desc: "Foundational literacy, numeracy, and life skills through activity-based learning.",
    icon: BookOpen,
  },
  {
    id: "lower-secondary",
    title: "Lower Secondary (Class 6-8)",
    desc: "Stronger conceptual learning with project work, language development, and science exposure.",
    icon: FlaskConical,
  },
  {
    id: "secondary",
    title: "Secondary Level (Class 9-10)",
    desc: "SEE-focused curriculum with practical classes, guidance, and exam preparation support.",
    icon: Monitor,
  },
  {
    id: "higher-secondary",
    title: "+2 Level (Class 11-12)",
    desc: "Science and Management streams designed for higher education and career pathways.",
    icon: PenSquare,
  },
];

const iconByIndex = [BookOpen, FlaskConical, Monitor, PenSquare] as const;

function toAnchorId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const translateDay = (day: string, isNe: boolean) => {
  if (!isNe) return day;
  const days: Record<string, string> = {
    Sunday: "आइतबार",
    Monday: "सोमबार",
    Tuesday: "मंगलबार",
    Wednesday: "बुधबार",
    Thursday: "बिहीबार",
    Friday: "शुक्रबार",
    Saturday: "शनिबार",
  };
  return days[day] || day;
};

const translateSubject = (sub: string, isNe: boolean) => {
  if (!isNe) return sub;
  const subs: Record<string, string> = {
    English: "अंग्रेजी",
    Math: "गणित",
    Science: "विज्ञान",
    Social: "सामाजिक",
    Nepali: "नेपाली",
    Computer: "कम्प्युटर",
    Health: "स्वास्थ्य",
    GK: "सामान्य ज्ञान",
    Library: "पुस्तकालय",
    ECA: "अतिरिक्त क्रियाकलाप",
    Revision: "पुनरावलोकन",
    Test: "परीक्षा",
    Project: "परियोजना",
    Club: "क्लब",
    Sports: "खेलकुद",
  };
  return subs[sub] || sub;
};

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const cmsPrograms = cmsData?.programs ?? [];
  const displayPrograms = cmsPrograms.length
    ? cmsPrograms.map((program, index) => ({
        id: toAnchorId(program.label),
        title: `${program.label}${program.desc ? ` (${program.desc})` : ""}`,
        desc: program.sub || program.desc,
        sub: program.sub,
        icon: iconByIndex[index] ?? PenSquare,
      }))
    : programs.map((program, index) => ({
        id: program.id,
        title: isNe ? (
          program.id === "primary" ? "प्राथमिक तह (कक्षा १-५)" :
          program.id === "lower-secondary" ? "निम्न माध्यमिक तह (कक्षा ६-८)" :
          program.id === "secondary" ? "माध्यमिक तह (कक्षा ९-१०)" :
          "+२ तह (कक्षा ११-१२)"
        ) : program.title,
        desc: isNe ? (
          program.id === "primary" ? "क्रियाकलापमा आधारित सिकाइ मार्फत आधारभूत साक्षरता, अंकगणित र जीवन उपयोगी सीपहरू।" :
          program.id === "lower-secondary" ? "परियोजना कार्य, भाषा विकास, र विज्ञान प्रविधिको प्रयोग मार्फत बलियो वैचारिक सिकाइ।" :
          program.id === "secondary" ? "व्यावहारिक कक्षाहरू, मार्गदर्शन, र परीक्षा तयारी सहयोगको साथ एसईई-केन्द्रित पाठ्यक्रम।" :
          "उच्च शिक्षा र करियरको लागि विज्ञान र व्यवस्थापन संकायहरू।"
        ) : program.desc,
        sub: "",
        icon: iconByIndex[index] ?? PenSquare,
      }));

  const routineData = cmsData?.routine ?? [];
  const displayRoutine = routineData.length > 0
    ? routineData.map((item) => [
        translateDay(item.day, isNe),
        translateSubject(item.p1, isNe),
        translateSubject(item.p2, isNe),
        translateSubject(item.p3, isNe),
        translateSubject(item.p4, isNe),
        translateSubject(item.p5, isNe),
      ])
    : [
        ["Sunday", "English", "Math", "Science", "Social", "Nepali"],
        ["Monday", "Math", "Science", "Computer", "Health", "English"],
        ["Tuesday", "Nepali", "Math", "GK", "Science", "Social"],
        ["Wednesday", "Science", "English", "Math", "Computer", "Library"],
        ["Thursday", "Social", "Health", "Math", "English", "ECA"],
        ["Friday", "Revision", "Test", "Project", "Club", "Sports"],
      ].map((row) => [
        translateDay(row[0], isNe),
        ...row.slice(1).map((sub) => translateSubject(sub, isNe)),
      ]);

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">{t("academics")}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "शैक्षिक कार्यक्रम र सिकाइ संरचना" : "Academic Programs and Learning Framework"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "हाम्रो पाठ्यक्रम र कार्यक्रमहरू राष्ट्रिय शैक्षिक मापदण्ड र गुणस्तरीय सिकाइ विधिहरूमा आधारित छन्।"
              : "Our academic programs are built on top-tier educational standards and student-centric practical learning paradigms."}
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-8">
        <section className="grid md:grid-cols-2 gap-5">
          {displayPrograms.map((program) => (
            <article key={program.id} id={program.id} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-[#1a3a6b] text-white rounded flex items-center justify-center">
                  <program.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-[#1a3a6b] text-lg leading-tight">{program.title}</h2>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{program.desc}</p>
                  {program.sub ? <p className="text-xs text-gray-500 mt-1">{program.sub}</p> : null}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section id="routine" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] text-white px-5 py-3 flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{t("weeklyRoutine")}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="bg-gray-100 text-[#1a3a6b]">
                  <th className="text-left p-3">{isNe ? "दिन" : "Day"}</th>
                  <th className="text-left p-3">{isNe ? "घण्टी १" : "Period 1"}</th>
                  <th className="text-left p-3">{isNe ? "घण्टी २" : "Period 2"}</th>
                  <th className="text-left p-3">{isNe ? "घण्टी ३" : "Period 3"}</th>
                  <th className="text-left p-3">{isNe ? "घण्टी ४" : "Period 4"}</th>
                  <th className="text-left p-3">{isNe ? "घण्टी ५" : "Period 5"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {displayRoutine.map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50 transition-colors">
                    {row.map((item, idx) => (
                      <td key={`${row[0]}-${idx}`} className="p-3 font-medium">{item}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.35fr_1fr] gap-6">
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <h2 className="section-title">{isNe ? "मूल्यांकन र परीक्षण" : "Assessment & Evaluation"}</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
              {(isNe
                ? [
                    "इकाई परीक्षाहरू (मासिक)",
                    "त्रैमासिक परीक्षाहरू",
                    "व्यावहारिक मूल्यांकन",
                    "परियोजनामा आधारित मूल्यांकन",
                    "उपस्थिति र सहभागिता",
                    "अन्तिम बोर्ड परीक्षा तयारी",
                  ]
                : [
                    "Unit Tests (Monthly)",
                    "Terminal Examinations",
                    "Practical Evaluations",
                    "Project-Based Assessment",
                    "Attendance & Participation",
                    "Final Board Preparation",
                  ]
              ).map((item) => (
                <li key={item} className="bg-gray-50 border border-gray-200 rounded-sm px-3 py-2">{item}</li>
              ))}
            </ul>
          </article>

          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <h2 className="section-title">{isNe ? "शैक्षिक सोधपुछ फारम" : "Academic Enquiry Form"}</h2>
            <form className="space-y-3">
              <input type="text" placeholder={isNe ? "विद्यार्थीको नाम" : "Student Name"} className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
              <input type="text" placeholder={isNe ? "अभिभावकको नाम" : "Parent/Guardian Name"} className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
              <select className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
                <option>{isNe ? "कक्षा चयन गर्नुहोस्" : "Select Class"}</option>
                <option>{isNe ? "कक्षा १-५" : "Class 1-5"}</option>
                <option>{isNe ? "कक्षा ६-८" : "Class 6-8"}</option>
                <option>{isNe ? "कक्षा ९-१०" : "Class 9-10"}</option>
                <option>{isNe ? "कक्षा ११-१२" : "Class 11-12"}</option>
              </select>
              <textarea placeholder={isNe ? "तपाईंको प्रश्न" : "Your Question"} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm" />
              <button type="button" className="w-full h-10 bg-[#1a3a6b] text-white font-semibold rounded-sm hover:bg-[#12305a] transition-colors">
                {isNe ? "सोधपुछ पठाउनुहोस्" : "Submit Enquiry"}
              </button>
            </form>
          </article>
        </section>
      </div>
    </div>
  );
}
