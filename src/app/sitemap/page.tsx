import Link from "next/link";
import { getHomepageCmsData } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { translations, TranslationKey } from "@/lib/translations";
import { Language, getSafeLanguage } from "@/lib/language";

export const dynamic = "force-dynamic";

function toAnchorId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function SitemapPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const programs = cmsData?.programs ?? [];

  const academicLinks = programs.length > 0
    ? programs.map((p) => ({
        label: p.label,
        href: `/academics#${toAnchorId(p.label)}`,
      }))
    : [
        { label: isNe ? "प्राथमिक तह" : "Primary Level", href: "/academics#primary" },
        { label: isNe ? "निम्न माध्यमिक तह" : "Lower Secondary", href: "/academics#lower-secondary" },
        { label: isNe ? "माध्यमिक तह" : "Secondary Level", href: "/academics#secondary" },
        { label: isNe ? "+२ तह" : "+2 Level", href: "/academics#higher-secondary" },
      ];

  const sections = [
    {
      title: isNe ? "मुख्य नेभिगेसन" : "Main Navigation",
      links: [
        { label: t("home"), href: "/" },
        { label: t("about"), href: "/about" },
        { label: t("academics"), href: "/academics" },
        { label: t("alumni"), href: "/alumni" },
        { label: t("scholarships"), href: "/scholarships" },
        { label: t("gallery"), href: "/gallery" },
        { label: t("notices"), href: "/notices" },
        { label: t("contact"), href: "/contact" },
      ],
    },
    {
      title: isNe ? "परिचय खण्डहरू" : "About Sections",
      links: [
        { label: isNe ? "हाम्रो इतिहास" : "Our History", href: "/about#history" },
        { label: isNe ? "दृष्टि र उद्देश्य" : "Vision & Mission", href: "/about#mission" },
        { label: isNe ? "प्रधानाध्यापकको सन्देश" : "Principal's Message", href: "/about#principal" },
        { label: isNe ? "व्यवस्थापन टोली" : "Management Team", href: "/about#management" },
        { label: isNe ? "सुविधाहरू" : "School Facilities", href: "/#facilities" },
      ],
    },
    {
      title: isNe ? "शैक्षिक र भर्ना" : "Academics & Admissions",
      links: [
        ...academicLinks,
        { label: t("weeklyRoutine"), href: "/academics#routine" },
        { label: t("onlineAdmission"), href: "/admissions" },
        { label: t("downloadCorner"), href: "/notices#downloads" },
      ],
    },
    {
      title: isNe ? "कानुनी र जानकारी" : "Legal & Information",
      links: [
        { label: isNe ? "गोपनीयता नीति" : "Privacy Policy", href: "/privacy-policy" },
        { label: isNe ? "साइटम्याप" : "Sitemap", href: "/sitemap" },
        { label: isNe ? "प्रशासन निर्देशिका" : "CMS Admin Guide", href: "/cms-guide" },
      ],
    },
  ];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Navigation</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "साइटम्याप (Sitemap)" : "Sitemap"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "वेबसाइटको कुनै पनि पृष्ठ वा खण्डमा सजिलै जानको लागि तलको निर्देशिका प्रयोग गर्नुहोस्।"
              : "Find and navigate to any page or section of the Chhetrapal Secondary School website using the directory below."}
          </p>
        </div>
      </section>

      <div className="page-container page-section">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
              <h2 className="text-[#1a3a6b] font-bold text-lg mb-4 border-b border-gray-100 pb-2">
                {section.title}
              </h2>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-[#e8841a] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#e8841a]">›</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
