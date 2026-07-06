import Image from "next/image";
import Link from "next/link";
import { getHomepageCmsData } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { translations, Language, TranslationKey, getSafeLanguage } from "@/context/LanguageContext";
import { sanitizeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

export default async function AlumniPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const alumni = cmsData?.alumni?.length ? cmsData.alumni : [];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">{t("alumni")}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "हाम्रा भूतपूर्व विद्यार्थीहरू" : "Our Alumni"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "विद्यालयका भूतपूर्व विद्यार्थीहरूको यात्रा, सफलता र शैक्षिक योगदानको विवरण।"
              : "Stories, achievements, and profiles of former students who continue to represent the school with pride."}
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-6">
        {alumni.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {alumni.map((person) => (
              <article key={person.name} className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm flex flex-col h-full">
                <div className="relative aspect-[4/3] bg-gray-100 flex-shrink-0">
                  <Image src={person.photoUrl || "/teacher-teaching-students.jpeg"} alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8841a]">
                    {person.year ? (isNe ? `${person.year} ब्याज` : `Class of ${person.year}`) : (isNe ? "पूर्व विद्यार्थी" : "Alumni")}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-[#1a3a6b]">{person.name}</h2>
                  <p className="mt-1 text-sm font-medium text-gray-600">{person.achievement}</p>
                  <div
                    className="mt-3 text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none flex-1"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(person.bio) }}
                  />
                  {person.link && (
                    <Link href={person.link} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#e8841a] hover:underline">
                      {isNe ? "थप पढ्नुहोस्" : "Read More"}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
            {isNe
              ? "हालसम्म कुनै पनि पूर्व विद्यार्थी प्रोफाइलहरू प्रकाशित गरिएका छैनन्।"
              : "No alumni profiles have been published yet. Add alumni posts in the content manager to populate this page."}
          </div>
        )}
      </div>
    </div>
  );
}