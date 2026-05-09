import { CheckCircle2, UserPlus2, BadgeHelp } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";
import AdmissionsApplicationForm from "@/components/admissions-application-form";

const steps = [
  { title: "Fill Application Form", desc: "Submit student details and guardian information." },
  { title: "Document Verification", desc: "Provide required academic and identity documents." },
  { title: "Entrance / Interview", desc: "Complete the school entrance process for selected grades." },
  { title: "Admission Confirmation", desc: "Receive admission confirmation and class schedule." },
];

export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  const cmsData = await getHomepageCmsData();
  const programChips = cmsData?.programs?.length
    ? cmsData.programs.map((program) => `${program.label}${program.desc ? ` (${program.desc})` : ""}`)
    : ["Class 1 - 5 (Primary)", "Class 6 - 8 (Lower Sec.)", "Class 9 - 10 (SEE)", "Class 11 - 12 (+2)"];
  const downloadForms = cmsData?.downloads?.length
    ? cmsData.downloads.map((download) => ({
        title: download.title,
        href: download.fileUrl || "#",
      }))
    : [{ title: "Download Blank Form", href: "#" }];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Admissions</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Online Admission UI</h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            Admission-related classes and downloadable forms are updated centrally for non-technical edits.
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
            <h2 className="section-title">Required Documents</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Birth Certificate / Citizenship Copy",
                "Previous School Character Certificate",
                "Latest Marksheet / Transcript",
                "Passport Size Photos (4 copies)",
                "Guardian ID Proof",
                "Transfer Certificate (if applicable)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#e8841a]" /> {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <h2 className="section-title">Fee Snapshot (Dummy)</h2>
            <div className="space-y-2 text-sm">
              {[
                ["Admission Fee", "NPR 2,500"],
                ["Monthly Tuition", "NPR 1,800"],
                ["Lab / Activity", "NPR 900"],
                ["Annual Exam Fee", "NPR 1,200"],
              ].map((row) => (
                <div key={row[0]} className="flex items-center justify-between border border-gray-200 rounded-sm px-3 py-2 text-gray-600">
                  <span>{row[0]}</span>
                  <span className="font-semibold text-[#1a3a6b]">{row[1]}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="bg-[#1a3a6b] text-white px-5 py-3 flex items-center gap-2">
            <UserPlus2 className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">Admission Form (UI Only)</h2>
          </div>
          <AdmissionsApplicationForm downloadHref={downloadForms[0]?.href || "#"} downloadTitle={downloadForms[0]?.title || "Download Blank Form"} />
        </section>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
          <h2 className="section-title">Available Classes</h2>
          <div className="flex flex-wrap gap-2">
            {programChips.map((program) => (
              <span key={program} className="rounded-sm bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#1a3a6b] border border-blue-100">
                {program}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
          <h2 className="section-title flex items-center gap-2"><BadgeHelp className="h-4 w-4 text-[#e8841a]" />Admission FAQ (Dummy)</h2>
          <div className="space-y-2">
            {[
              "When does admission open each year?",
              "Do you provide scholarship options?",
              "Is transportation available?",
              "How can I track my application status?",
            ].map((q) => (
              <details key={q} className="border border-gray-200 rounded-sm px-3 py-2 bg-gray-50">
                <summary className="cursor-pointer text-sm font-semibold text-[#1a3a6b]">{q}</summary>
                <p className="text-sm text-gray-600 mt-2">This is placeholder answer text. Replace with official response later.</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
