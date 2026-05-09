import Image from "next/image";
import { getHomepageCmsData } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export default async function ScholarshipsPage() {
  const cmsData = await getHomepageCmsData();
  const scholarships = cmsData?.scholarships?.length ? cmsData.scholarships : [];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] py-14 text-white md:py-20">
        <div className="page-container">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-200">Scholarships</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">Scholarship Achievers</h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 md:text-base">
            A regularly updated list of students who achieved scholarships through academic excellence,
            talent, and community leadership.
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-6">
        {scholarships.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {scholarships.map((winner) => (
              <article
                key={`${winner.studentName}-${winner.year}-${winner.scholarshipTitle}`}
                className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-gray-100">
                  <Image
                    src={winner.photoUrl || "/student-showcasing-project.jpeg"}
                    alt={winner.studentName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8841a]">{winner.year}</p>
                  <h2 className="mt-1 text-lg font-bold text-[#1a3a6b]">{winner.studentName}</h2>
                  <p className="mt-1 text-sm font-medium text-gray-600">{winner.scholarshipTitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{winner.details}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
            No scholarship winners have been published yet. Add entries in the Scholarships section of the
            content manager to populate this page.
          </div>
        )}
      </div>
    </div>
  );
}
