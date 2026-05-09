import { getHomepageCmsData } from "@/lib/wordpress";
import GalleryGrid from "@/components/gallery-grid";

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
            Photos are pulled from the gallery section. Publish or update featured images to refresh this page.
          </p>
        </div>
      </section>

      <div className="page-container page-section">
        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
