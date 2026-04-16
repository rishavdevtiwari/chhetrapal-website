import Image from "next/image";

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

export default function GalleryPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Gallery</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">School Photo Gallery</h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            Placeholder gallery layout with filters and lightbox-style cards (UI only). Replace/add photos anytime.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
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
          {galleryItems.map((item) => (
            <article key={item.src} className="group bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.src} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 1024px) 50vw, 25vw" />
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
