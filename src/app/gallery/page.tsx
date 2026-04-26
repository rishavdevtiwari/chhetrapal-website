import Image from "next/image";
import { getHomepageCmsData } from "@/lib/wordpress";

const galleryItems = [
  { src: "/class-image-1.jpeg", title: "Classroom Session" },
  { src: "/class-image-2.jpeg", title: "Students in Learning Activity" },
  { src: "/entrance-image.jpeg", title: "School Entrance" },
  { src: "/main-entrance-with-school-board.jpeg", title: "Main Gate and School Board" },
  { src: "/student-assembled.jpeg", title: "Student Assembly" },
  { src: "/student-showcasing-project.jpeg", title: "Project Showcase" },
  { src: "/teacher-teaching-students.jpeg", title: "Teaching Session" },
  { src: "/another-part-of-school.jpeg", title: "Campus View" },
];

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const cmsData = await getHomepageCmsData();
  const cmsGallery = cmsData?.gallery?.filter((item) => Boolean(item.src)) ?? [];
  const items = cmsGallery.length
    ? cmsGallery.map((item) => ({
        src: item.src,
        title: item.title,
        alt: item.alt || item.title,
      }))
    : galleryItems.map((item) => ({
        ...item,
        alt: item.title,
      }));

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Gallery</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">School Photo Gallery</h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            Photos are pulled from the CMS gallery section. Publish or update featured images to refresh this page.
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-6">
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex flex-wrap gap-2">
          {[
            "All",
            "Campus",
            "Classroom",
            "Events",
            "Projects",
            "Sports",
          ].map((filter, i) => (
            <button
              key={filter}
              type="button"
              className={`px-4 h-9 rounded-sm text-sm font-medium border ${i === 0 ? "bg-[#1a3a6b] text-white border-[#1a3a6b]" : "bg-white text-[#1a3a6b] border-gray-300 hover:bg-blue-50"}`}
            >
              {filter}
            </button>
          ))}
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <article key={item.src} className="group bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-[#0f2744]/0 group-hover:bg-[#0f2744]/25 transition-colors" />
              </div>
              <div className="p-3">
                <h2 className="text-sm text-[#1a3a6b] leading-tight">{item.title}</h2>
                <p className="text-xs text-gray-500 mt-1">Placeholder caption text</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
