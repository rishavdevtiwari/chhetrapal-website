import Image from "next/image";
import Link from "next/link";
import { BookOpen, Target, Eye, Users, Award, ChevronRight, BadgeCheck } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { translations, TranslationKey } from "@/lib/translations";
import { Language, getSafeLanguage } from "@/lib/language";
import { sanitizeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  
  const hero = cmsData?.hero;
  const principal = cmsData?.principal;

  const principalName = principal?.name || (lang === "ne" ? "हरि प्रसाद सुवेदी" : "Hari Prasad Subedi");
  const principalDesignation = principal?.designation || (lang === "ne" ? "प्रधानाध्यापक" : "Principal");

  const team = [
    { name: lang === "ne" ? "श्री हरि प्रसाद सुवेदी" : "Mr. Hari Prasad Subedi", role: "Principal" },
    { name: "Ms. Sita Karki", role: "Vice Principal" },
    { name: "Mr. Nabin Shrestha", role: "Academic Coordinator" },
    { name: "Ms. Gita Bhandari", role: "Administrative Head" },
  ];

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
            <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "परिचय" : "Introduction"}</h2>
          </div>
          <div className="p-5 grid md:grid-cols-[1.4fr_1fr] gap-6 items-start">
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                {lang === "ne"
                  ? "नुवाकोट जिल्लाको ऐतिहासिक र पुरानो शैक्षिक धरोहर क्षेत्रपाल माध्यमिक विद्यालय स्थापना कालदेखि नै यस क्षेत्रको शिक्षा ज्योति फैलाउने मुख्य केन्द्रको रूपमा स्थापित छ। वि.सं. २०१६ सालमा प्राथमिक विद्यालयको रूपमा यसको जग बसालिएको थियो। शिक्षाको आवश्यकता र स्थानीयवासीको चाहना अनुसार वि.सं. २०२३ मा यो तत्कालीन 'मिडिल स्कुल' र वि.सं. २०३१ साल चैत्र १६ गते औपचारिक रूपमा माध्यमिक विद्यालयको रूपमा रूपान्तरित भयो।"
                  : "Chhetrapal Secondary School, a historical and old educational heritage of Nuwakot district, has been established as the main center for spreading the light of education in this region since its establishment. BS. 2016 was its foundation as a primary school. According to the needs of education and the wishes of the locals, it was converted into the then 'Middle School' in BS. 2023 and was formally converted into a secondary school on Chaitra 16, BS. 2031."}
              </p>
              <p>
                {lang === "ne"
                  ? "लामो र गौरवशाली इतिहास बोकेको यस विद्यालयले स्थापना कालदेखि नै गुणस्तरीय, संस्कारयुक्त र प्रविधिमैत्री शिक्षा प्रदान गर्दै आएको छ। जिल्लाकै उत्कृष्ट शैक्षिक नतिजा हासिल सफल यस विद्यालयले राष्ट्रलाई आवश्यक पर्ने दक्ष, नैतिकवान् र प्रतिस्पर्धी जनशक्ति उत्पादनमा निरन्तर योगदान पुर्याइरहेको छ।"
                  : "This school, which has a long and glorious history, has been providing quality, cultured and technology-friendly education since its establishment. This school, which has succeeded in achieving the best educational results in the district, is continuously contributing to the production of skilled, ethical and competitive manpower needed by the nation."}
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
              <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "लक्ष्य (Mission)" : "Our Mission"}</h2>
            </div>
            <div className="p-5 text-sm text-gray-600 leading-relaxed">
              <p>
                {lang === "ne"
                  ? "विद्यार्थीहरूको चौतर्फी विकास (बौद्धिक, शारीरिक, मानसिक र सामाजिक) का लागि सुरक्षित, बालमैत्री र अत्याधुनिक सिकाई वातावरण तयार गर्ने।"
                  : "To create a safe, child-friendly and state-of-the-art learning environment for the all-round development of students (intellectual, physical, mental and social)."}
              </p>
            </div>
          </article>

          <article className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
              <Eye className="h-5 w-5 text-[#e8841a]" />
              <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "दृष्टिकोण (Vision)" : "Our Vision"}</h2>
            </div>
            <div className="p-5 text-sm text-gray-600 leading-relaxed">
              <p>
                {lang === "ne"
                  ? "व्यवहारिक, प्रविधिमैत्री र गुणस्तरीय शिक्षा प्रदान गरी राष्ट्रिय तथा अन्तर्राष्ट्रिय स्तरमा प्रतिस्पर्धा गर्न सक्ने सक्षम, नैतिकवान् र जिम्मेवार नागरिक उत्पादन गर्ने अग्रणी शैक्षिक संस्था बन्ने।"
                  : "To become a leading educational institution that produces capable, ethical and responsible citizens who can compete at the national and international levels by providing practical, technology-friendly and quality education."}
              </p>
            </div>
          </article>
        </section>

        <section id="key-features" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <BadgeCheck className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "मुख्य विशेषताहरू" : "Key Features"}</h2>
          </div>
          <div className="p-5">
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 leading-relaxed list-none pl-0">
              {(lang === "ne" ? [
                "६ दशकभन्दा लामो गौरवशाली शैक्षिक इतिहास र अनुभव।",
                "नुवाकोट जिल्लाकै उत्कृष्ट र निरन्तर उच्च शैक्षिक नतिजा।",
                "अनुभवी, तालिमप्राप्त र पूर्ण समर्पित शिक्षक शिक्षिकाहरू।",
                "सुविधासम्पन्न कक्षाकोठा, विज्ञान प्रयोगशाला र कम्प्युटर ल्याब।",
                "अतिरिक्त क्रियाकलाप (ECA) र खेलकुदमा विशेष जोड।",
                "संस्कारयुक्त र अनुशासित शैक्षिक वातावरण।"
              ] : [
                "More than 6 decades of glorious educational history and experience.",
                "The best and consistently high academic results in Nuwakot district.",
                "Experienced, trained and fully dedicated teachers.",
                "Well-equipped classrooms, science laboratories and computer labs.",
                "Special emphasis on extracurricular activities (ECA) and sports.",
                "A cultured and disciplined educational environment."
              ]).map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-5 w-5 text-[#e8841a]">
                    <BadgeCheck className="h-4.5 w-4.5" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="principal" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <Users className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">{lang === "ne" ? "प्रधानाध्यापकको सन्देश" : "Principal's Message"}</h2>
          </div>
          <div className="p-5 md:p-6 grid md:grid-cols-[160px_1fr] gap-6 items-start">
            <div className="relative w-40 h-44 rounded-sm overflow-hidden border border-gray-200 mx-auto md:mx-0">
              <Image src={principal?.photoUrl || "/teacher-teaching-students.jpeg"} alt={principalName} fill className="object-cover" sizes="160px" />
            </div>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              {principal?.message ? (
                <div
                  className="italic border-l-4 border-[#e8841a] pl-4 prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(principal.message) }}
                />
              ) : (
                <div className="italic border-l-4 border-[#e8841a] pl-4 space-y-3 text-gray-600">
                  {lang === "ne" ? (
                    <>
                      <p>आदरणीय अभिभावक, शिक्षक शिक्षिका, कर्मचारी वर्ग तथा प्रिय विद्यार्थी भाइबहिनीहरू,</p>
                      <p>नुवाकोट जिल्लाकै पुरानो र ऐतिहासिक शैक्षिक धरोहर क्षेत्रपाल माध्यमिक विद्यालय को आधिकारिक वेबसाइटमा यहाँहरू सबैलाई हार्दिक स्वागत गर्दछु।</p>
                      <p>वि.सं. २०१६ सालदेखि सुरु भएको यस विद्यालयको शैक्षिक यात्रा आज यो उचाइमा आइपुग्नुमा यस क्षेत्रका बुद्धिजीवी, शिक्षाप्रेमी, आदरणीय अभिभावक र शिक्षक शिक्षिकाहरूको अथक प्रयास, त्याग र समर्पणको परिणाम हो। वि.सं. २०३१ साल चैत्र १६ गते माध्यमिक विद्यालयको रूपमा औपचारिक रूपमा स्थापित भएयता यस विद्यालयले गुणस्तरीय शिक्षाको क्षेत्रमा जिल्लामै एक छुट्टै पहिचान बनाउन सफल भएको छ।</p>
                      <p>हाम्रो मुख्य उद्देश्य केवल किताबी ज्ञान दिनु मात्र होइन, बरु विद्यार्थीहरूमा लुकेको प्रतिभालाई प्रस्फुटन गराई उनीहरूलाई नैतिकवान्, आत्मनिर्भर र समाजप्रति उत्तरदायी नागरिक बनाउनु हो। बदलिँदो समयसँगै हामीले विद्यालयको भौतिक तथा प्राविधिक पूर्वाधार परिमार्जन गर्दै प्रविधिमैत्री र व्यावहारिक शिक्षण पद्धतिलाई आत्मसाथ गरिरहेका छौँ। जसकै फलस्वरूप हाम्रो शैक्षिक नतिजा निरन्तर उत्कृष्ट रहँदै आएको छ।</p>
                      <p>विद्यालयको सर्वाङ्गीण विकास र विद्यार्थीहरूको उज्ज्वल भविष्यका लागि हामी सधैँ प्रतिबद्ध छौँ। विद्यालयलाई अझ परिष्कृत र उत्कृष्ट बनाउन यहाँहरूबाट रचनात्मक सल्लाह, सुझाव र निरन्तर सहयोगको अपेक्षा गर्दछौँ।</p>
                      <p>धन्यवाद।</p>
                      <div className="mt-4 pt-2 not-italic text-xs border-t border-gray-100 text-gray-500">
                        <span className="block font-bold">हरि प्रसाद सुवेदी</span>
                        <span className="block">प्रधानाध्यापक</span>
                        <span className="block">क्षेत्रपाल माध्यमिक विद्यालय,</span>
                        <span className="block">लिखु ४, चौघडा नुवाकोट, नेपाल।</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Respected parents, teachers, staff and dear students,</p>
                      <p>I warmly welcome you all to the official website of Chhetrapal Secondary School, the oldest and historical educational heritage of Nuwakot district.</p>
                      <p>The educational journey of this school, which began in 2016, is the result of the tireless efforts, sacrifice and dedication of the intellectuals, education lovers, respected parents and teachers of this area. Since its formal establishment as a secondary school on Chaitra 16, 2031, this school has succeeded in creating a distinct identity in the district in the field of quality education.</p>
                      <p>Our main objective is not only to impart bookish knowledge, but also to make the students moral, self-reliant and socially responsible citizens by bringing out the hidden talent in them. With the changing times, we are modifying the physical and technical infrastructure of the school and adopting a technology-friendly and practical teaching method. As a result, our academic results have been consistently excellent.</p>
                      <p>We are always committed to the overall development of the school and the bright future of the students. We expect constructive advice, suggestions and continuous support from here to make the school more sophisticated and excellent.</p>
                      <p>Thank you.</p>
                      <div className="mt-4 pt-2 not-italic text-xs border-t border-gray-100 text-gray-500">
                        <span className="block font-bold">Hari Prasad Subedi</span>
                        <span className="block">Principal</span>
                        <span className="block">Chhetrapal Secondary School,</span>
                        <span className="block">Likhu 4, Chaughada Nuwakot, Nepal.</span>
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="mt-4">
                <span className="block font-bold text-[#1a3a6b]">{principalName}</span>
                <span className="block text-xs text-gray-500 uppercase tracking-wider">{principalDesignation}</span>
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
