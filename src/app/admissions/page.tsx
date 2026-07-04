import { CheckCircle2, UserPlus2 } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";
import AdmissionsApplicationForm from "@/components/admissions-application-form";
import { cookies } from "next/headers";
import { translations, Language, TranslationKey } from "@/context/LanguageContext";

const stepsEn = [
  { title: "Fill Application Form", desc: "Submit student details and guardian information." },
  { title: "Document Verification", desc: "Provide required academic and identity documents." },
  { title: "Entrance / Interview", desc: "Complete the school entrance process for selected grades." },
  { title: "Admission Confirmation", desc: "Receive admission confirmation and class schedule." },
];

const stepsNe = [
  { title: "आवेदन फारम भर्नुहोस्", desc: "विद्यार्थीको विवरण र अभिभावकको जानकारी पेश गर्नुहोस्।" },
  { title: "कागजात प्रमाणीकरण", desc: "आवश्यक शैक्षिक र पहिचान कागजातहरू प्रदान गर्नुहोस्।" },
  { title: "प्रवेश परीक्षा / अन्तर्वार्ता", desc: "चयन गरिएका कक्षाहरूको लागि प्रवेश प्रक्रिया पूरा गर्नुहोस्।" },
  { title: "भर्ना निश्चितता", desc: "भर्ना स्वीकृतिको जानकारी र कक्षा तालिका प्राप्त गर्नुहोस्।" },
];

const docsEn = [
  "Birth Certificate / Citizenship Copy",
  "Previous School Character Certificate",
  "Latest Marksheet / Transcript",
  "Passport Size Photos (4 copies)",
  "Guardian ID Proof",
  "Transfer Certificate (if applicable)",
];

const docsNe = [
  "जन्म दर्ता प्रमाणपत्र / नागरिकताको प्रतिलिपि",
  "अघिल्लो विद्यालयको चारित्रिक प्रमाणपत्र",
  "भर्खरको लब्धांक पत्र (Marksheet) / ट्रान्सक्रिप्ट",
  "राहदानी आकारको फोटो (४ प्रति)",
  "अभिभावकको परिचय पत्र",
  "स्थानान्तरण प्रमाणपत्र (लागु हुने भएमा)",
];

const feesEn = [
  ["Admission Fee", "NPR 2,500"],
  ["Monthly Tuition", "NPR 1,800"],
  ["Lab / Activity", "NPR 900"],
  ["Annual Exam Fee", "NPR 1,200"],
];

const feesNe = [
  ["भर्ना शुल्क", "रु २,५००"],
  ["मासिक शिक्षण शुल्क", "रु १,८००"],
  ["प्रयोगशाला / गतिविधि", "रु ९००"],
  ["वार्षिक परीक्षा शुल्क", "रु १,२०0"],
];

export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("chhetrapal_lang")?.value || "en") as Language;
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const steps = isNe ? stepsNe : stepsEn;
  const docs = isNe ? docsNe : docsEn;
  const fees = isNe ? feesNe : feesEn;

  const programChips = cmsData?.programs?.length
    ? cmsData.programs.map((program) => `${program.label}${program.desc ? ` (${program.desc})` : ""}`)
    : [
        isNe ? "कक्षा १ - ५ (प्राथमिक तह)" : "Class 1 - 5 (Primary)",
        isNe ? "कक्षा ६ - ८ (निम्न माध्यमिक तह)" : "Class 6 - 8 (Lower Sec.)",
        isNe ? "कक्षा ९ - १० (एस.ई.ई. तह)" : "Class 9 - 10 (SEE)",
        isNe ? "कक्षा ११ - १२ (+२ तह)" : "Class 11 - 12 (+2)",
      ];

  const downloadForms = cmsData?.downloads?.length
    ? cmsData.downloads.map((download) => ({
        title: download.title,
        href: download.fileUrl || "#",
      }))
    : [{ title: isNe ? "रिक्त फारम डाउनलोड गर्नुहोस्" : "Download Blank Form", href: "#" }];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">{t("onlineAdmission")}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "अनलाइन भर्ना पोर्टल" : "Online Admission Portal"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "क्षेत्रपाल माध्यमिक विद्यालयमा आफ्नो बच्चालाई भर्ना गर्नुहोस्। सोधपुछ फारम भर्नुहोस् वा भर्ना निर्देशिका डाउनलोड गर्नुहोस्।"
              : "Enroll your child in Chhetrapal Secondary School. Submit an application inquiry online or download our admission guidelines below."}
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-8">
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <article key={step.title} className="bg-white border border-gray-200 rounded-sm shadow-sm p-4">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1a3a6b] text-white text-xs font-bold">{idx + 1}</span>
              <h2 className="text-[#1a3a6b] text-base mt-3">{step.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
            </article>
          ))}
        </section>

        <section className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <h2 className="section-title">{isNe ? "आवश्यक कागजातहरू" : "Required Documents"}</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {docs.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#e8841a]" /> {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <h2 className="section-title">{isNe ? "शुल्क विवरण (Fee Snapshot)" : "Fee Snapshot"}</h2>
            {cmsData?.contact?.feeStructure ? (
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {cmsData.contact.feeStructure}
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                {fees.map((row) => (
                  <div key={row[0]} className="flex items-center justify-between border border-gray-200 rounded-sm px-3 py-2 text-gray-600">
                    <span>{row[0]}</span>
                    <span className="font-semibold text-[#1a3a6b]">{row[1]}</span>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="bg-[#1a3a6b] text-white px-5 py-3 flex items-center gap-2">
            <UserPlus2 className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{t("admissionForm")}</h2>
          </div>
          <AdmissionsApplicationForm
            downloadHref={downloadForms[0]?.href || "#"}
            downloadTitle={downloadForms[0]?.title || (isNe ? "रिक्त फारम डाउनलोड" : "Download Blank Form")}
          />
        </section>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
          <h2 className="section-title">{isNe ? "उपलब्ध कक्षाहरू" : "Available Classes"}</h2>
          <div className="flex flex-wrap gap-2">
            {programChips.map((program) => (
              <span key={program} className="rounded-sm bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#1a3a6b] border border-blue-100">
                {program}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
