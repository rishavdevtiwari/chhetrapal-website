import Link from "next/link";
import { getHomepageCmsData } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { translations, Language, TranslationKey } from "@/context/LanguageContext";

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("chhetrapal_lang")?.value || "en") as Language;
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const contact = cmsData?.contact;
  const privacyPolicyContent = contact?.privacyPolicy;

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "यो गोपनीयता नीतिले विद्यार्थी, अभिभावक र आगन्तुकहरूद्वारा प्रदान गरिएको व्यक्तिगत जानकारीको संकलन र सुरक्षाको बारेमा जानकारी दिन्छ।"
              : "This Privacy Policy describes how Chhetrapal Secondary School collects, uses, and safeguards personal information provided by students, parents, and visitors."}
          </p>
        </div>
      </section>

      <div className="page-container page-section max-w-4xl bg-white border border-gray-200 rounded-sm shadow-sm p-6 md:p-10 my-8 space-y-6 text-gray-700">
        {privacyPolicyContent ? (
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
            {privacyPolicyContent}
          </div>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-bold text-[#1a3a6b] mb-3">
                {isNe ? "१. जानकारी संकलन" : "1. Information Collection"}
              </h2>
              <p className="text-sm leading-relaxed">
                {isNe
                  ? "हामी तपाईंले हाम्रो अनलाइन भर्ना पोर्टल प्रयोग गर्दा, सोधपुछ बुझाउँदा वा विद्यालयसँग सञ्चार गर्दा व्यक्तिगत जानकारी संकलन गर्दछौं। यसमा सम्पर्क जानकारी (जस्तै नाम, फोन नम्बर, र इमेल ठेगाना), विद्यार्थी शैक्षिक अभिलेख, जन्म मिति, र अभिभावकको विवरण समावेश हुन्छ।"
                  : "We collect personal information when you use our Online Admission portal, submit enquiries, or communicate with the school. This includes contact information (such as name, phone number, and email address), student academic records, birth dates, and guardian details."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a6b] mb-3">
                {isNe ? "२. जानकारीको प्रयोग" : "2. Use of Information"}
              </h2>
              <p className="text-sm leading-relaxed">
                {isNe
                  ? "संकलित जानकारी विद्यालय प्रशासन, शैक्षिक मूल्यांकन, भर्ना प्रक्रिया र सञ्चारका लागि मात्र प्रयोग गरिन्छ। हामी तपाईंको व्यक्तिगत विवरणहरू तेस्रो-पक्ष विज्ञापन सेवाहरूसँग बेच्ने वा साझा गर्दैनौं।"
                  : "The collected information is used solely for school administration, academic evaluations, admission processing, and communication. We do not sell or share your personal details with third-party advertising services."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a6b] mb-3">
                {isNe ? "३. डाटा सुरक्षा" : "3. Data Security"}
              </h2>
              <p className="text-sm leading-relaxed">
                {isNe
                  ? "हामी तपाईंको डाटालाई अनधिकृत पहुँच, परिमार्जन वा खुलासाबाट जोगाउन उपयुक्त भौतिक, प्राविधिक र प्रशासनिक सुरक्षा उपायहरू लागू गर्छौं। अनलाइन आवेदन डाटा सुरक्षित रूपमा भण्डारण गरिन्छ र केवल अधिकृत विद्यालय कर्मचारीहरूले मात्र पहुँच गर्न सक्छन्।"
                  : "We implement appropriate physical, technical, and administrative security measures to protect your data from unauthorized access, alteration, or disclosure. Online application data is stored securely and accessed only by authorized school personnel."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a6b] mb-3">
                {isNe ? "४. कुकीज र वेब विश्लेषण" : "4. Cookies and Web Analytics"}
              </h2>
              <p className="text-sm leading-relaxed">
                {isNe
                  ? "हाम्रो वेबसाइटले नेभिगेसन सहज बनाउन र भाषा प्राथमिकताहरू (जस्तै नेपालीमा अनुवाद गर्ने) समर्थन गर्न आधारभूत कार्यात्मक कुकीहरू प्रयोग गर्दछ। कुनै हानिकारक ट्र्याकिङ कुकीहरू प्रयोग गरिएका छैनन्।"
                  : "Our website uses basic functional cookies to facilitate navigation and support language preferences (such as translating page contents into Nepali). No invasive tracking cookies are used."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a6b] mb-3">
                {isNe ? "५. सम्पर्क जानकारी" : "5. Contact Information"}
              </h2>
              <p className="text-sm leading-relaxed">
                {isNe
                  ? "यदि यस गोपनीयता नीतिको बारेमा कुनै प्रश्नहरू छन् वा डाटा अद्यावधिक गर्न चाहनुहुन्छ भने, कृपया हाम्रो प्रशासन कार्यालयमा सम्पर्क गर्नुहोस्:"
                  : "If you have any questions about this Privacy Policy or wish to request data updates, please contact our administration office at:"}
                <br />
                <strong>{isNe ? "इमेल:" : "Email:"}</strong> {contact?.email || "info@chhetrapalschool.edu.np"}
                <br />
                <strong>{isNe ? "फोन नम्बर:" : "Phone:"}</strong> {contact?.phone || "9851181243"}
                <br />
                <strong>{isNe ? "ठेगाना:" : "Address:"}</strong> {contact?.address || "Likhu Rural Municipality-4, Chaughada, Nuwakot, Nepal"}
              </p>
            </section>
          </>
        )}

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>{isNe ? "अन्तिम अद्यावधिक: जुलाई २०२६" : "Last Updated: July 2026"}</span>
          <Link href="/" className="text-[#e8841a] font-semibold hover:underline">
            {isNe ? "गृह पृष्ठमा फर्कनुहोस्" : "Return to Homepage"}
          </Link>
        </div>
      </div>
    </div>
  );
}
