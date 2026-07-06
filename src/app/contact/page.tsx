import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";
import ContactMessageForm from "@/components/contact-message-form";
import { cookies } from "next/headers";
import { translations, TranslationKey } from "@/context/LanguageContext";
import { Language, getSafeLanguage } from "@/lib/language";

const fallbackMapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.925360626243!2d85.2387678754744!3d27.904263726070322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eadfa5e05bbc35%3A0x3eb57e2564e36dd4!2sShree%20Kshetrapal%20Uchcha%20Madhyamik%20Bidyalaya!5e0!3m2!1sen!2snp!4v1776366200281!5m2!1sen!2snp";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const contact = cmsData?.contact;
  const address = contact?.address || (isNe ? "लिखु गाउँपालिका वडा नं. ४, चौघडा नुवाकोट, बागमती प्रदेश, नेपाल" : "Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal");
  const phone = contact?.phone || "9851181243";
  const email = contact?.email || "info@chhetrapalschool.edu.np";
  const mapUrl = contact?.mapUrl || fallbackMapUrl;

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">{t("contact")}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "सम्पर्क र भ्रमण गर्नुहोस्" : "Contact and Visit Us"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "विद्यालयका प्रशासनिक सम्पर्क विवरणहरू र गुगल नक्साको विवरण।"
              : "Official school contact details, map location, and general administrative office hours."}
          </p>
        </div>
      </section>

      <div className="page-container page-section grid lg:grid-cols-[1fr_1.25fr] gap-6">
        <aside className="space-y-4">
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] font-bold uppercase tracking-wide">{isNe ? "ठेगाना" : "Address"}</h2>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{address}</p>
            </div>
          </article>
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <Phone className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] font-bold uppercase tracking-wide">{isNe ? "फोन नम्बर" : "Phone"}</h2>
              <p className="text-sm text-gray-600 mt-1">{phone}</p>
            </div>
          </article>
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <Mail className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] font-bold uppercase tracking-wide">{isNe ? "इमेल" : "Email"}</h2>
              <p className="text-sm text-gray-600 mt-1">{email}</p>
            </div>
          </article>
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] font-bold uppercase tracking-wide">{isNe ? "कार्यालय समय" : "Office Hours"}</h2>
              <p className="text-sm text-gray-600 mt-1">{isNe ? "आइतबार-शुक्रबार: १०:०० बजे - ४:०० बजे सम्म" : "Sun-Fri: 10:00 AM - 4:00 PM"}</p>
            </div>
          </article>

          <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src={mapUrl}
              title="Shree Kshetrapal Uchcha Madhyamik Bidyalaya Location"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="bg-[#1a3a6b] text-white px-5 py-3">
            <h2 className="text-sm uppercase tracking-widest">{isNe ? "हामीलाई सन्देश पठाउनुहोस्" : "Send Us a Message"}</h2>
          </div>
          <ContactMessageForm email={email} />
        </section>
      </div>
    </div>
  );
}
