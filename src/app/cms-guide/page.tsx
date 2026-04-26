import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const mappingRows = [
  {
    cpt: "Notices",
    wordpress: "WordPress -> Notices",
    section: "Homepage Notices, Notices Page",
    tips: "Use Notice Type (Notice/Event/Result), add excerpt and publish date.",
  },
  {
    cpt: "Staff & Principal",
    wordpress: "WordPress -> Staff & Principal",
    section: "Homepage Principal block, About page principal info",
    tips: "Set role taxonomy to Principal and add featured image.",
  },
  {
    cpt: "Programs",
    wordpress: "WordPress -> Programs",
    section: "Homepage Academic Programs, Academics page cards, Admissions class chips",
    tips: "Title = program name, excerpt = class range, subtitle meta = short summary.",
  },
  {
    cpt: "Facilities",
    wordpress: "WordPress -> Facilities",
    section: "Homepage Facilities",
    tips: "Keep concise title and short excerpt for clean card layout.",
  },
  {
    cpt: "Downloads",
    wordpress: "WordPress -> Downloads",
    section: "Homepage Downloads, Notices Download Corner, Admissions form download",
    tips: "Fill File URL and Button Label meta fields.",
  },
  {
    cpt: "Gallery Items",
    wordpress: "WordPress -> Gallery Items",
    section: "Homepage Gallery, Gallery page grid",
    tips: "Featured image is used as gallery photo. Title becomes caption.",
  },
  {
    cpt: "Contacts",
    wordpress: "WordPress -> Contacts",
    section: "Header top bar phone/email/social, Contact page, Footer contact block",
    tips: "Maintain phone/email/address/map + Facebook/YouTube/Twitter URLs.",
  },
];

export default function CmsGuidePage() {
  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] py-14 text-white md:py-20">
        <div className="page-container">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-200">CMS Editor Guide</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">Content Team Publishing Map</h1>
          <p className="mt-4 max-w-3xl text-sm text-white/85 md:text-base">
            This page tells your content team exactly where to edit content in WordPress and where each update appears on the live site.
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-8">
        <section className="panel p-5">
          <h2 className="section-title">WordPress to Website Mapping</h2>
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left text-[#1a3a6b]">
                  <th className="p-3 font-semibold">Content Type</th>
                  <th className="p-3 font-semibold">Where to Edit</th>
                  <th className="p-3 font-semibold">Where It Appears</th>
                  <th className="p-3 font-semibold">Editor Tips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {mappingRows.map((row) => (
                  <tr key={row.cpt}>
                    <td className="p-3 font-semibold text-[#1a3a6b]">{row.cpt}</td>
                    <td className="p-3">{row.wordpress}</td>
                    <td className="p-3">{row.section}</td>
                    <td className="p-3">{row.tips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="panel p-5">
            <h2 className="section-title">Publishing Checklist</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "Create or edit item in the correct content type.",
                "Set title and content/excerpt clearly.",
                "Set taxonomy (Notice Type, Role, Level, etc.) where relevant.",
                "Add a featured image for gallery/staff/program cards.",
                "Click Publish or Update.",
                "Refresh website pages to verify rendering.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#e8841a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel p-5">
            <h2 className="section-title">Quick Access</h2>
            <div className="space-y-3 text-sm">
              <Link className="flex items-center justify-between rounded-sm border border-gray-200 px-3 py-2 text-[#1a3a6b] hover:bg-blue-50" href="/wp-admin/">
                Open WordPress Admin
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="flex items-center justify-between rounded-sm border border-gray-200 px-3 py-2 text-[#1a3a6b] hover:bg-blue-50" href="/notices">
                Check Notices Page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="flex items-center justify-between rounded-sm border border-gray-200 px-3 py-2 text-[#1a3a6b] hover:bg-blue-50" href="/gallery">
                Check Gallery Page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="flex items-center justify-between rounded-sm border border-gray-200 px-3 py-2 text-[#1a3a6b] hover:bg-blue-50" href="/contact">
                Check Contact Page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
