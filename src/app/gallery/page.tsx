import { getHomepageCmsData } from "@/lib/wordpress";
import GalleryGrid from "@/components/gallery-grid";
import { cookies } from "next/headers";
import { translations, TranslationKey } from "@/lib/translations";
import { Language, getSafeLanguage } from "@/lib/language";

const galleryEn = [
  { src: "/class-image-1.jpeg", title: "Classroom Session" },
  { src: "/class-image-2.jpeg", title: "Students in Learning Activity" },
  { src: "/entrance-image.jpeg", title: "School Entrance" },
  { src: "/main-entrance-with-school-board.jpeg", title: "Main Gate and School Board" },
  { src: "/student-assembled.jpeg", title: "Student Assembly" },
  { src: "/student-showcasing-project.jpeg", title: "Project Showcase" },
  { src: "/teacher-teaching-students.jpeg", title: "Teaching Session" },
  { src: "/another-part-of-school.jpeg", title: "Campus View" },
];

const galleryNe = [
  { src: "/class-image-1.jpeg", title: "कक्षा शिक्षण गतिविधि" },
  { src: "/class-image-2.jpeg", title: "सिकाइ क्रियाकलापमा विद्यार्थीहरू" },
  { src: "/entrance-image.jpeg", title: "विद्यालय प्रवेशद्वार" },
  { src: "/main-entrance-with-school-board.jpeg", title: "मुख्य गेट र विद्यालय बोर्ड" },
  { src: "/student-assembled.jpeg", title: "विद्यार्थी सभा (Assembly)" },
  { src: "/student-showcasing-project.jpeg", title: "परियोजना प्रदर्शन" },
  { src: "/teacher-teaching-students.jpeg", title: "अध्यापन सत्र" },
  { src: "/another-part-of-school.jpeg", title: "विद्यालय परिसर" },
];

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const t = (key: TranslationKey) => translations[lang][key] || translations["en"][key];
  const isNe = lang === "ne";

  const cmsGallery = cmsData?.gallery?.filter((item) => Boolean(item.src)) ?? [];
  const items = cmsGallery.length
    ? cmsGallery.map((item) => ({
        src: item.src,
        title: item.title,
        alt: item.alt || item.title,
      }))
    : (isNe ? galleryNe : galleryEn).map((item) => ({
        ...item,
        alt: item.title,
      }));

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">{t("gallery")}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            {isNe ? "फोटो ग्यालरी" : "School Photo Gallery"}
          </h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            {isNe
              ? "विद्यालयका शैक्षिक गतिविधि, कार्यक्रम र परिसरका केही झलकहरू।"
              : "Photos are pulled from the gallery section. Publish or update featured images to refresh this page."}
          </p>
        </div>
      </section>

      <div className="page-container page-section">
        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
