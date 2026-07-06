import Image from "next/image";
import Link from "next/link";
import { BookOpen, Target, Eye, Users, Award, ChevronRight } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { translations, TranslationKey } from "@/context/LanguageContext";
import { Language, getSafeLanguage } from "@/lib/language";
import { sanitizeHtml } from "@/lib/sanitize";

const team = [
  { name: "Mr. Ram Bahadur Thapa", role: "Principal" },
  { name: "Ms. Sita Karki", role: "Vice Principal" },
  { name: "Mr. Nabin Shrestha", role: "Academic Coordinator" },
  { name: "Ms. Gita Bhandari", role: "Administrative Head" },
];

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  
  const hero = cmsData?.hero;
  const principal = cmsData?.principal;

  return (
    <div className="page-shell">
      <section className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <Image src="/another-part-of-school.jpeg" alt="School campus" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-[#0f2744]/55" />
        <div className="page-container relative z-10 h-full flex flex-col justify-center">
          <p className="text-white/80 text-sm uppercase tracking-[0.22em]">{t("about")}</p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mt-2">
            {lang === "ne" ? `हाम्रो बारेमा - ${hero?.title || "क्षेत्रपाल मा.वि."}` : `About ${hero?.title || "Chhetrapal Secondary School"}`}
          </h1>
          <p className="text-white/85 max-w-2xl mt-3 text-sm md:text-base">
            {hero?.description || (lang === "ne" ? "विद्यालयको प्रोफाइल, इतिहास, नेतृत्व र दृष्टिकोणको सिंहावलोकन।" : "School profile, history, leadership, and mission overview.")}
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-8">
        <section id="history" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <BookOpen className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "हाम्रो इतिहास" : "Our History"}</h2>
          </div>
          <div className="p-5 grid md:grid-cols-[1.4fr_1fr] gap-6 items-start">
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                {lang === "ne"
                  ? "क्षेत्रपाल माध्यमिक विद्यालयको स्थापना २०४६ सालमा नुवाकोटमा गुणस्तरीय सार्वजनिक शिक्षा प्रदान गर्ने परिकल्पनाका साथ भएको थियो।"
                  : "Chhetrapal Secondary School was established in 2046 BS with a vision to provide quality public education in Nuwakot."}
              </p>
              <p>
                {lang === "ne"
                  ? "समयसँगै, विद्यालयले प्राथमिक कक्षाहरूबाट उच्च माध्यमिक शिक्षामा विस्तार गर्‍यो, विज्ञान, व्यवस्थापन, र विभिन्न पृष्ठभूमिका विद्यार्थीहरूको लागि व्यावहारिक सिकाइ विधिहरू प्रस्तुत गर्‍यो।"
                  : "Over time, the school expanded from primary classes to higher secondary education, introducing science, management, and practical learning approaches for students from diverse backgrounds."}
              </p>
              <p>
                {lang === "ne"
                  ? "यस क्षेत्रको एक पुरानो र प्रतिष्ठित विद्यालयको रूपमा, यसले धेरै दक्ष जनशक्तिहरू उत्पादन गरिसकेको छ जो हाल देश तथा विदेशमा विभिन्न क्षेत्रहरूमा कार्यरत छन्।"
                  : "As one of the oldest and most trusted schools in the region, it has produced numerous successful graduates who are now contributing to various fields across Nepal and abroad."}
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-gray-200">
              <Image src="/entrance-image.jpeg" alt="School entrance" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
            </div>
          </div>
        </section>

        <section id="alumni" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <Users className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{t("alumni")}</h2>
          </div>
          <div className="p-5 text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              {lang === "ne"
                ? "हाम्रा पूर्व विद्यार्थीहरू यस विद्यालयका गौरव हुन्। तिनीहरूले राष्ट्र निर्माण र समाज सेवामा महत्त्वपूर्ण योगदान पुर्‍याएका छन्।"
                : "Our alumni are the pride of our school. They have made significant contributions in nation-building and community service."}
            </p>
          </div>
        </section>

        <section id="mission" className="grid md:grid-cols-2 gap-6">
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
              <Target className="h-5 w-5 text-[#e8841a]" />
              <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "उद्देश्य (Mission)" : "Our Mission"}</h2>
            </div>
            <div className="p-5 text-sm text-gray-600 leading-relaxed space-y-3">
              <p>
                {lang === "ne"
                  ? "समावेशी र व्यावहारिक शिक्षाको माध्यमबाट विद्यार्थीहरूलाई जिम्मेवार, रचनात्मक र शैक्षिक रूपमा सबल बनाउनु।"
                  : "To nurture responsible, creative, and academically strong students through inclusive education."}
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>{lang === "ne" ? "विद्यार्थी-केन्द्रित सिकाइ वातावरण" : "Student-centered learning environment"}</li>
                <li>{lang === "ne" ? "शैक्षिक र अतिरिक्त क्रियाकलापहरूको सन्तुलन" : "Balance of academics, values, and co-curricular growth"}</li>
                <li>{lang === "ne" ? "सामुदायिक संलग्नता र सामाजिक उत्तरदायित्व" : "Community engagement and social responsibility"}</li>
              </ul>
            </div>
          </article>

          <article className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
              <Eye className="h-5 w-5 text-[#e8841a]" />
              <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "दूरदृष्टि (Vision)" : "Our Vision"}</h2>
            </div>
            <div className="p-5 text-sm text-gray-600 leading-relaxed space-y-3">
              <p>
                {lang === "ne"
                  ? "उत्कृष्टता, समता र नवीनताका लागि परिचित नेपालको एक अग्रणी मोडेल सार्वजनिक विद्यालय बन्नु।"
                  : "To be a trusted model public school in Nepal known for excellence, equity, and innovation."}
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>{lang === "ne" ? "सबै तहमा गुणस्तरीय र प्रभावकारी सिकाइ नतिजा" : "Strong academic outcomes across grades"}</li>
                <li>{lang === "ne" ? "प्रविधि र व्यावहारिक सीपको समायोजन" : "Technology and practical skill integration"}</li>
                <li>{lang === "ne" ? "सुरक्षित र प्रेरणादायी शैक्षिक वातावरण" : "Safe and inspiring school culture"}</li>
              </ul>
            </div>
          </article>
        </section>

        <section id="principal" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <Users className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "प्रधानाध्यापकको सन्देश" : "Principal's Message"}</h2>
          </div>
          <div className="p-5 md:p-6 grid md:grid-cols-[160px_1fr] gap-6 items-start">
            <div className="relative w-40 h-44 rounded-sm overflow-hidden border border-gray-200 mx-auto md:mx-0">
              <Image src={principal?.photoUrl || "/teacher-teaching-students.jpeg"} alt={principal?.name || "Principal"} fill className="object-cover" sizes="160px" />
            </div>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              {principal?.message ? (
                <div
                  className="italic border-l-4 border-[#e8841a] pl-4 prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(principal.message) }}
                />
              ) : (
                <p className="italic border-l-4 border-[#e8841a] pl-4">
                  {lang === "ne"
                    ? "\"हामी अनुशासन, मूल्य-आधारित शिक्षा, र राष्ट्रिय स्तर अनुसारको आधुनिक शिक्षण रणनीतिहरू मार्फत भविष्यको लागि तयार पुस्ता निर्माण गर्न प्रतिबद्ध छौं।\""
                    : "\"We are committed to building a future-ready generation through discipline, value-based education, and modern teaching strategies aligned with national standards.\""}
                </p>
              )}
              <div className="mt-4">
                <span className="block font-bold text-[#1a3a6b]">{principal?.name || "Principal"}</span>
                <span className="block text-xs text-gray-500 uppercase tracking-wider">{principal?.designation || (lang === "ne" ? "प्रधानाध्यापक" : "Principal")}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="management" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <Award className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "व्यवस्थापन टोली" : "Management Team"}</h2>
          </div>
          <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <article key={member.name} className="border border-gray-200 rounded-sm p-4 bg-gray-50">
                <div className="h-14 w-14 rounded-full bg-[#1a3a6b] text-white flex items-center justify-center text-lg font-bold mb-3">
                  {member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                </div>
                <h3 className="text-[#1a3a6b] text-sm font-bold leading-tight">{member.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  {member.role === "Principal" && lang === "ne" ? "प्रधानाध्यापक" :
                   member.role === "Vice Principal" && lang === "ne" ? "सहायक प्रधानाध्यापक" :
                   member.role === "Academic Coordinator" && lang === "ne" ? "शैक्षिक संयोजक" :
                   member.role === "Administrative Head" && lang === "ne" ? "प्रशासनिक प्रमुख" :
                   member.role}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#1a3a6b] text-white rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">{lang === "ne" ? "भर्ना, पाठ्यक्रम, र सूचनाहरू अन्वेषण गर्नुहोस्" : "Explore Admissions, Curriculum, and Notices"}</h2>
            <p className="text-white/80 text-sm mt-2">{lang === "ne" ? "सम्पर्क वा भर्नाका लागि अनलाइन आवेदन दिनुहोस्।" : "Apply online for admission or get in touch."}</p>
          </div>
          <Link href="/admissions" className="inline-flex items-center gap-1.5 bg-[#e8841a] text-white px-5 py-3 rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
            {lang === "ne" ? "भर्नामा जानुहोस्" : "Go to Admissions"} <ChevronRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
