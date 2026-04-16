import { Download, Search, Bell } from "lucide-react";

const notices = [
  { title: "Admission Notice for AY 2083", date: "2083-01-10", type: "Notice" },
  { title: "First Terminal Examination Routine", date: "2083-01-14", type: "Routine" },
  { title: "Scholarship Form Submission Deadline", date: "2083-01-18", type: "Announcement" },
  { title: "Parent-Teacher Meeting Schedule", date: "2083-01-20", type: "Notice" },
  { title: "SEE Preparation Class Timetable", date: "2083-01-25", type: "Routine" },
];

export default function NoticesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Notices</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Notices and Circulars</h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            Dummy notice board, search filters, and download actions for UI preview only.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1.55fr_1fr] gap-6">
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search notices" className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-sm text-sm" />
            </div>
            <select className="h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
              <option>All Types</option>
              <option>Notice</option>
              <option>Routine</option>
              <option>Announcement</option>
            </select>
          </div>

          <div className="divide-y divide-gray-100">
            {notices.map((notice) => (
              <article key={notice.title} className="px-5 py-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[#1a3a6b] text-base leading-tight">{notice.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">Published: {notice.date}</p>
                  <span className="inline-block mt-2 px-2 py-1 text-[11px] bg-blue-100 text-blue-700 rounded-sm uppercase tracking-wide font-bold">
                    {notice.type}
                  </span>
                </div>
                <button type="button" className="h-9 px-3 border border-gray-300 rounded-sm text-sm text-[#1a3a6b] hover:bg-blue-50 inline-flex items-center gap-2">
                  <Download className="h-4 w-4" /> PDF
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#e8841a]" />
              <h2 className="text-sm uppercase tracking-widest">Subscribe to Notices</h2>
            </div>
            <form className="p-4 space-y-3">
              <input type="text" placeholder="Full Name" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
              <input type="email" placeholder="Email Address" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
              <select className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
                <option>Preferred Notice Type</option>
                <option>All</option>
                <option>Routine</option>
                <option>Admission</option>
              </select>
              <button type="button" className="w-full h-10 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </form>
          </section>

          <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-4">
            <h2 className="section-title">Download Corner</h2>
            <ul className="space-y-2 text-sm">
              {[
                "School Prospectus",
                "Annual Calendar",
                "Admission Form",
                "Scholarship Guidelines",
              ].map((item) => (
                <li key={item}>
                  <button type="button" className="w-full text-left border border-gray-200 rounded-sm px-3 py-2 hover:bg-gray-50 text-gray-600">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
