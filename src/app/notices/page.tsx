import { getHomepageCmsData } from "@/lib/wordpress";
import NoticeBoard from "@/components/notice-board";

const notices = [
  { title: "Admission Notice for AY 2083", date: "2083-01-10", type: "Notice" },
  { title: "First Terminal Examination Routine", date: "2083-01-14", type: "Routine" },
  { title: "Scholarship Form Submission Deadline", date: "2083-01-18", type: "Announcement" },
  { title: "Parent-Teacher Meeting Schedule", date: "2083-01-20", type: "Notice" },
  { title: "SEE Preparation Class Timetable", date: "2083-01-25", type: "Routine" },
];

export const dynamic = "force-dynamic";

function formatNoticeDate(month: string, day: string): string {
  return `${month} ${day}`;
}

export default async function NoticesPage() {
  const cmsData = await getHomepageCmsData();
  const noticeItems = cmsData?.notices?.length
    ? cmsData.notices.map((notice) => ({
        title: notice.title,
        date: formatNoticeDate(notice.date.month, notice.date.day),
        type: notice.tag,
        link: notice.link || "#",
      }))
    : notices.map((notice) => ({
        ...notice,
        link: "#",
      }));
  const downloadItems = cmsData?.downloads?.length
    ? cmsData.downloads.map((download) => ({
        title: download.title,
        href: download.fileUrl || "#",
      }))
    : [
        { title: "School Prospectus", href: "#" },
        { title: "Annual Calendar", href: "#" },
        { title: "Admission Form", href: "#" },
        { title: "Scholarship Guidelines", href: "#" },
      ];

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Notices</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Notices and Circulars</h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            Latest notices are synced from CMS. Publish new notices there to update this board.
          </p>
        </div>
      </section>

      <div className="page-container page-section">
        <NoticeBoard notices={noticeItems} downloads={downloadItems} />
      </div>
    </div>
  );
}
