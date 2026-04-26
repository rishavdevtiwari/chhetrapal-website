import { BookOpen, FlaskConical, Monitor, PenSquare, FileText } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";

const programs = [
  {
    id: "primary",
    title: "Primary Level (Class 1-5)",
    desc: "Foundational literacy, numeracy, and life skills through activity-based learning.",
    icon: BookOpen,
  },
  {
    id: "lower-secondary",
    title: "Lower Secondary (Class 6-8)",
    desc: "Stronger conceptual learning with project work, language development, and science exposure.",
    icon: FlaskConical,
  },
  {
    id: "secondary",
    title: "Secondary Level (Class 9-10)",
    desc: "SEE-focused curriculum with practical classes, guidance, and exam preparation support.",
    icon: Monitor,
  },
  {
    id: "higher-secondary",
    title: "+2 Level (Class 11-12)",
    desc: "Science and Management streams designed for higher education and career pathways.",
    icon: PenSquare,
  },
];

const iconByIndex = [BookOpen, FlaskConical, Monitor, PenSquare] as const;

function toAnchorId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  const cmsData = await getHomepageCmsData();
  const cmsPrograms = cmsData?.programs ?? [];
  const displayPrograms = cmsPrograms.length
    ? cmsPrograms.map((program, index) => ({
        id: toAnchorId(program.label),
        title: `${program.label}${program.desc ? ` (${program.desc})` : ""}`,
        desc: program.sub || program.desc,
        sub: program.sub,
        icon: iconByIndex[index] ?? PenSquare,
      }))
    : programs.map((program, index) => ({
        id: program.id,
        title: program.title,
        desc: program.desc,
        sub: "",
        icon: iconByIndex[index] ?? PenSquare,
      }));

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Academics</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Academic Programs and Learning Framework</h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            Programs are connected with CMS content so curriculum labels and descriptions can be maintained by admin staff.
          </p>
        </div>
      </section>

      <div className="page-container page-section space-y-8">
        <section className="grid md:grid-cols-2 gap-5">
          {displayPrograms.map((program) => (
            <article key={program.id} id={program.id} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-[#1a3a6b] text-white rounded flex items-center justify-center">
                  <program.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-[#1a3a6b] text-lg leading-tight">{program.title}</h2>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{program.desc}</p>
                  {program.sub ? <p className="text-xs text-gray-500 mt-1">{program.sub}</p> : null}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] text-white px-5 py-3 flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">Weekly Class Routine (Dummy)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="bg-gray-100 text-[#1a3a6b]">
                  <th className="text-left p-3">Day</th>
                  <th className="text-left p-3">Period 1</th>
                  <th className="text-left p-3">Period 2</th>
                  <th className="text-left p-3">Period 3</th>
                  <th className="text-left p-3">Period 4</th>
                  <th className="text-left p-3">Period 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ["Sunday", "English", "Math", "Science", "Social", "Nepali"],
                  ["Monday", "Math", "Science", "Computer", "Health", "English"],
                  ["Tuesday", "Nepali", "Math", "GK", "Science", "Social"],
                  ["Wednesday", "Science", "English", "Math", "Computer", "Library"],
                  ["Thursday", "Social", "Health", "Math", "English", "ECA"],
                  ["Friday", "Revision", "Test", "Project", "Club", "Sports"],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((item) => (
                      <td key={item} className="p-3">{item}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.35fr_1fr] gap-6">
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <h2 className="section-title">Assessment & Evaluation</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
              {[
                "Unit Tests (Monthly)",
                "Terminal Examinations",
                "Practical Evaluations",
                "Project-Based Assessment",
                "Attendance & Participation",
                "Final Board Preparation",
              ].map((item) => (
                <li key={item} className="bg-gray-50 border border-gray-200 rounded-sm px-3 py-2">{item}</li>
              ))}
            </ul>
          </article>

          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <h2 className="section-title">Academic Enquiry Form</h2>
            <form className="space-y-3">
              <input type="text" placeholder="Student Name" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
              <input type="text" placeholder="Parent/Guardian Name" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
              <select className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
                <option>Select Class</option>
                <option>Class 1-5</option>
                <option>Class 6-8</option>
                <option>Class 9-10</option>
                <option>Class 11-12</option>
              </select>
              <textarea placeholder="Your Question" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm" />
              <button type="button" className="w-full h-10 bg-[#1a3a6b] text-white font-semibold rounded-sm hover:bg-[#12305a] transition-colors">
                Submit Enquiry
              </button>
            </form>
          </article>
        </section>
      </div>
    </div>
  );
}
