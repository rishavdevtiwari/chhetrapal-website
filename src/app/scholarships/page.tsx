import Image from "next/image";
import { getHomepageCmsData } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { translations, Language, TranslationKey } from "@/context/LanguageContext";
import { sanitizeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

export default async function ScholarshipsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("chhetrapal_lang")?.value || "en") as Language;
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const scholarships = cmsData?.scholarships?.length ? cmsData.scholarships : [];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] py-14 text-white md:py-20">
        <div className="page-container">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-200">{t("scholarships")}</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
            {isNe ? "छात्रवृत्ति प्राप्तकर्ताहरू" : "Scholarship Achievers"}
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 md:text-base">
            {isNe
              ? "शैक्षिक उत्कृष्टता, प्रतिभा र सामुदायिक नेतृत्व प्रदर्शन गरेर छात्रवृत्ति प्राप्त गर्न सफल विद्यार्थीहरूको विवरण।"
              : "A regularly updated list of students who achieved scholarships through academic excellence, talent, and community leadership."}
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-6">
        {scholarships.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {scholarships.map((winner) => (
              <article
                key={`${winner.studentName}-${winner.year}-${winner.scholarshipTitle}`}
                className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] bg-gray-100 flex-shrink-0">
                  <Image
                    src={winner.photoUrl || "/student-showcasing-project.jpeg"}
                    alt={winner.studentName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8841a]">
                    {winner.year ? (isNe ? `${winner.year} शैक्षिक वर्ष` : `Academic Year ${winner.year}`) : (isNe ? "छात्रवृत्ति" : "Scholarship")}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-[#1a3a6b]">{winner.studentName}</h2>
                  <p className="mt-1 text-sm font-medium text-gray-600">{winner.scholarshipTitle}</p>
                  <div
                    className="mt-3 text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none flex-1"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(winner.details) }}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
            {isNe
              ? "हालसम्म कुनै पनि छात्रवृत्ति विजेताहरूको विवरण प्रकाशित गरिएको छैन।"
              : "No scholarship winners have been published yet. Add entries in the Scholarships section of the content manager to populate this page."}
          </div>
        )}
      </div>

      {cmsData?.contact?.scholarshipRules && (
        <div className="page-container pb-12">
          <section className="bg-blue-50 border border-blue-100 rounded-sm p-6 md:p-8 shadow-sm">
            <h2 className="text-[#1a3a6b] text-xl font-bold mb-4 font-display">
              {isNe ? "छात्रवृत्ति नियम तथा योग्यता विवरण" : "Scholarship Eligibility & Guidelines"}
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
              {cmsData.contact.scholarshipRules}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
