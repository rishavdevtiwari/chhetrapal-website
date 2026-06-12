import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  ChevronRight,
  Users,
  Trophy,
  BookOpen,
  GraduationCap,
  Library,
  FlaskConical,
  Computer,
  Volleyball,
  Palette,
  UtensilsCrossed,
  BadgeCheck,
  Microscope,
  Medal,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Download,
  Newspaper,
} from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

const fallbackHero = {
  eyebrow: "Government Secondary School • Est. 2046 BS",
  title: "Chhetrapal Secondary School",
  subtitle: "छेत्रपाल माध्यमिक विद्यालय",
  description: "Nuwakot, Bagmati Province, Nepal\nAffiliated to National Examination Board (NEB)",
};

const fallbackNotices = [
  { date: { day: "15", month: "Baisakh" }, title: "First Term Examination Routine 2083", tag: "Notice" },
  { date: { day: "10", month: "Chaitra" }, title: "Annual Sports Day Programme - Registration Open", tag: "Event" },
  { date: { day: "25", month: "Falgun" }, title: "Parent-Teacher Meeting: All Grades", tag: "Notice" },
  { date: { day: "01", month: "Falgun" }, title: "SEE Practical Examination Schedule Released", tag: "Result" },
  { date: { day: "15", month: "Magh" }, title: "Scholarship Application Form Available Now", tag: "Notice" },
  { date: { day: "05", month: "Magh" }, title: "Winter Break Notice & Holiday Calendar 2083", tag: "Notice" },
] as const;

const basePrograms = [
  { icon: BookOpen, label: "Primary Level", desc: "Class 1-5", sub: "Foundation of life-long learning" },
  { icon: BookOpen, label: "Lower Secondary", desc: "Class 6-8", sub: "Building analytical thinking" },
  { icon: GraduationCap, label: "Secondary Level", desc: "Class 9-10", sub: "SEE Board Examination" },
  { icon: GraduationCap, label: "+2 Level", desc: "Class 11-12", sub: "Science & Management Streams" },
];

const fallbackEvents = [
  { month: "Baisakh", day: "22", title: "Annual Prize Distribution", time: "11:00 AM" },
  { month: "Jestha", day: "05", title: "World Environment Day Programme", time: "10:00 AM" },
  { month: "Saun", day: "10", title: "Guru Purnima Celebration", time: "9:30 AM" },
];

const fallbackStats = [
  { value: "1,200+", label: "Students" },
  { value: "55+", label: "Expert Staff" },
  { value: "98%", label: "Pass Rate" },
  { value: "35+", label: "Years Legacy" },
];

const fallbackPrincipal = {
  name: "Mr. Ram Bahadur Thapa",
  title: "Principal",
  designation: "Principal",
  photoUrl: "/teacher-teaching-students.jpeg",
  link: "#",
  message:
    "Education is the most powerful weapon which you can use to change the world. At Chhetrapal Secondary School, we are committed to delivering knowledge, nurturing talent, and building character in every student who crosses our doors.",
};

const fallbackFacilities = [
  { icon: Library, label: "Library" },
  { icon: FlaskConical, label: "Science Lab" },
  { icon: Computer, label: "Computer Lab" },
  { icon: Volleyball, label: "Sports Ground" },
  { icon: Palette, label: "Art Room" },
  { icon: UtensilsCrossed, label: "Canteen" },
];

const fallbackDownloads = [
  { title: "Admission Form 2083", buttonLabel: "Download", fileUrl: "#" },
  { title: "School Prospectus", buttonLabel: "Download", fileUrl: "#" },
  { title: "Academic Calendar 2083", buttonLabel: "Download", fileUrl: "#" },
  { title: "Fee Structure 2083", buttonLabel: "Download", fileUrl: "#" },
];

const fallbackGalleryImages = [
  { src: "/class-image-1.jpeg", alt: "Students in a classroom session", title: "Photo 1" },
  { src: "/class-image-2.jpeg", alt: "Classroom learning activity", title: "Photo 2" },
  { src: "/student-assembled.jpeg", alt: "Students assembled during school activity", title: "Photo 3" },
  { src: "/student-showcasing-project.jpeg", alt: "Student showcasing a school project", title: "Photo 4" },
  { src: "/teacher-teaching-students.jpeg", alt: "Teacher teaching students in class", title: "Photo 5" },
  { src: "/another-part-of-school.jpeg", alt: "Another part of the school campus", title: "Photo 6" },
];

const fallbackAlumni = [
  {
    name: "Ms. Sushila Shrestha",
    year: "Batch 2060",
    achievement: "Community health leader and public education advocate",
    bio:
      "An alumna who now works on rural health and education initiatives across Nuwakot and Bagmati Province.",
    photoUrl: "/student-showcasing-project.jpeg",
    link: "#",
  },
] as const;

const fallbackContact = {
  address: "Likhu Rural Municipality Ward no. 4\nChaughada Nuwakot, Bagmati Province, Nepal",
  phone: "9851181243",
  email: "info@chhetrapalschool.edu.np",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.925360626243!2d85.2387678754744!3d27.904263726070322!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eadfa5e05bbc35%3A0x3eb57e2564e36dd4!2sShree%20Kshetrapal%20Uchcha%20Madhyamik%20Bidyalaya!5e0!3m2!1sen!2snp!4v1776366200281!5m2!1sen!2snp",
};

function cleanText(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

export default async function Home() {
  const cmsData = await getHomepageCmsData();
  const hero = cmsData?.hero ?? fallbackHero;
  const notices = cmsData?.notices?.length ? cmsData.notices : [...fallbackNotices];
  const cmsPrograms = cmsData?.programs ?? [];
  const programs = basePrograms.map((program, index) => ({
    ...program,
    label: cmsPrograms[index]?.label ?? program.label,
    desc: cmsPrograms[index]?.desc ?? program.desc,
    sub: cmsPrograms[index]?.sub ?? program.sub,
  }));
  const eventsFromCms = notices
    .filter((notice) => notice.tag === "Event")
    .map((notice) => ({
      month: notice.date.month,
      day: notice.date.day,
      title: notice.title,
      time: "10:00 AM",
    }));
  const events = eventsFromCms.length > 0 ? eventsFromCms.slice(0, 3) : fallbackEvents;
  const stats = cmsData?.stats?.length ? cmsData.stats : fallbackStats;
  const principal = cmsData?.principal ?? fallbackPrincipal;
  const cmsFacilities = cmsData?.facilities ?? [];
  const facilities = fallbackFacilities.map((facility, index) => ({
    ...facility,
    label: cmsFacilities[index]?.label ?? facility.label,
  }));
  const downloads = cmsData?.downloads?.length ? cmsData.downloads : fallbackDownloads;
  const galleryImages = cmsData?.gallery?.some((photo) => Boolean(photo.src)) ? cmsData.gallery : fallbackGalleryImages;
  const alumni = cmsData?.alumni?.length ? cmsData.alumni : fallbackAlumni;
  const contact = cmsData?.contact ?? fallbackContact;
  const principalMessage = cleanText(principal.message);

  return (
    <div className="page-shell">
      <section className="relative flex h-[70vh] min-h-[480px] max-h-[680px] w-full items-center justify-center overflow-hidden">
        <Image
          src="/main-entrance-with-school-board.jpeg"
          alt="Main entrance of Chhetrapal Secondary School"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0f2744]/45" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-50/60 to-transparent" />

        <div className="relative z-10 px-4 text-center">
          <div className="mb-5 inline-block rounded-sm bg-[#e8841a] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            {hero.eyebrow}
          </div>
          <h1 className="mb-3 text-4xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="mb-2 text-xl font-semibold text-white/90 md:text-2xl">
            {hero.subtitle}
          </p>
          <p className="mx-auto mb-8 max-w-xl whitespace-pre-line text-base text-white/85 md:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/admissions" className="rounded-sm bg-[#e8841a] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600 shadow">
              Online Admission ›
            </Link>
            <Link href="/about" className="rounded-sm bg-[#1a3a6b] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f2744] shadow">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#1a3a6b] py-5 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-0 divide-x divide-white/10 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="px-4 py-3 text-center">
                <div className="text-3xl font-extrabold leading-tight text-[#e8841a] md:text-4xl">{item.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-widest text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-container page-section">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="min-w-0 flex-1 space-y-10">
            <section id="about" className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] px-5 py-3 text-white">
                <BookOpen className="h-5 w-5 text-[#e8841a]" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Welcome to Our School</h2>
              </div>
              <div className="flex flex-col gap-6 p-5 md:flex-row md:p-6">
                <div className="relative h-52 w-full flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-100 md:w-52">
                  <Image
                    src="/entrance-image.jpeg"
                    alt="School entrance"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 208px"
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-[#1a3a6b]">About Chhetrapal Secondary School</h3>
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    Established in 2046 BS (1989 AD), Chhetrapal Secondary School is a government secondary school located in Nuwakot district of Bagmati Province, Nepal. Over the past three decades, we have been serving the educational needs of our community by providing quality education from primary to higher secondary level.
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    Affiliated to the National Examination Board (NEB) and following the curriculum set by the Curriculum Development Centre (CDC), our institution is proud to have contributed hundreds of successful graduates who are now excelling in various fields across Nepal and abroad.
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 rounded-sm bg-[#1a3a6b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f2744]">
                    Read More <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>

            <section id="principal" className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] px-5 py-3 text-white">
                <Users className="h-5 w-5 text-[#e8841a]" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Principal&apos;s Message</h2>
              </div>
              <div className="flex flex-col gap-6 p-5 sm:flex-row md:p-6">
                <div className="flex flex-shrink-0 flex-col items-center gap-2">
                  <div className="relative h-36 w-32 overflow-hidden rounded border border-gray-200 bg-gray-100">
                    <Image
                      src={principal.photoUrl || "/teacher-teaching-students.jpeg"}
                      alt={principal.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#1a3a6b]">{principal.name}</div>
                    <div className="text-xs uppercase tracking-wide text-gray-500">{principal.designation || principal.title}</div>
                  </div>
                </div>
                <div>
                  <p className="mb-3 border-l-4 border-[#e8841a] py-1 pl-4 text-sm leading-relaxed italic text-gray-600">
                    {principalMessage}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    On behalf of the entire staff and management of the school, I warmly welcome all students, parents, and guardians to our institution. We remain dedicated to providing a safe, inclusive, and academically stimulating environment for all.
                  </p>
                  <a href={principal.link || "#"} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#e8841a] hover:underline">
                    Read Full Message <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>

            <section id="academics" className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] px-5 py-3 text-white">
                <GraduationCap className="h-5 w-5 text-[#e8841a]" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Academic Programs</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                {programs.map((program) => (
                  <div key={program.label} className="group flex cursor-pointer items-start gap-4 rounded-sm border border-gray-100 bg-gray-50/60 p-4 transition-colors hover:border-[#1a3a6b]/30 hover:bg-blue-50/30">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-[#1a3a6b] text-white transition-colors group-hover:bg-[#e8841a]">
                      <program.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-base font-bold leading-tight text-[#1a3a6b]">{program.label}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[#e8841a]">{program.desc}</div>
                      <div className="mt-1 text-xs text-gray-500">{program.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] px-5 py-3 text-white">
                <Trophy className="h-5 w-5 text-[#e8841a]" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Our Facilities</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3">
                {facilities.map((facility) => (
                  <div key={facility.label} className="flex flex-col items-center justify-center rounded-sm border border-gray-100 bg-gray-50/70 py-5 text-center transition-colors hover:bg-blue-50/40">
                    <facility.icon className="mb-2 h-8 w-8 text-[#1a3a6b]" />
                    <span className="text-sm font-semibold text-[#1a3a6b]">{facility.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] px-5 py-3 text-white">
                <BadgeCheck className="h-5 w-5 text-[#e8841a]" />
                <h2 className="text-sm font-bold uppercase tracking-widest">School Highlights</h2>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-3">
                {[
                  { icon: Microscope, title: "Practical Learning", text: "Hands-on projects and lab-based activities across grades." },
                  { icon: Medal, title: "Strong Results", text: "Consistent SEE performance and active academic support." },
                  { icon: Users, title: "Inclusive Culture", text: "Safe, student-friendly environment with co-curricular growth." },
                ].map((item) => (
                  <article key={item.title} className="rounded-sm border border-gray-100 bg-gray-50/70 p-4 transition-colors hover:bg-blue-50/40">
                    <item.icon className="mb-2 h-7 w-7 text-[#1a3a6b]" />
                    <h3 className="text-sm font-bold text-[#1a3a6b]">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] px-5 py-3 text-white">
                <Users className="h-5 w-5 text-[#e8841a]" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Notable Alumni</h2>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-[1fr_1.05fr]">
                <article className="overflow-hidden rounded-sm border border-gray-100 bg-[#f8fbff] p-4">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
                    <Image
                      src={alumni[0]?.photoUrl || "/teacher-teaching-students.jpeg"}
                      alt={alumni[0]?.name || "Notable alumna"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 480px"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8841a]">
                    {alumni[0]?.year || "Alumni"}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#1a3a6b]">{alumni[0]?.name || "School Alumna"}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-600">{alumni[0]?.achievement || "Notable contribution to the community"}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{alumni[0]?.bio || "This section can be connected to alumni profiles later."}</p>
                  <a href={alumni[0]?.link || "#"} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#e8841a] hover:underline">
                    Read Profile <ChevronRight className="h-4 w-4" />
                  </a>
                </article>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  {alumni.slice(1).map((person) => (
                    <article key={person.name} className="flex items-start gap-4 rounded-sm border border-gray-100 bg-gray-50/70 p-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
                        <Image
                          src={person.photoUrl || "/teacher-teaching-students.jpeg"}
                          alt={person.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8841a]">{person.year || "Alumni"}</p>
                        <h3 className="text-sm font-bold text-[#1a3a6b]">{person.name}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-gray-600">{person.achievement}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="w-full flex-shrink-0 space-y-6 lg:w-72">
            <div className="overflow-hidden rounded-sm bg-[#e8841a] text-white shadow-sm">
              <div className="px-5 py-4 text-center">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-extrabold leading-tight">Admissions Open!</h3>
                <p className="mt-1 text-sm text-orange-100">Academic Year 2026/2027</p>
              </div>
              <div className="space-y-2 bg-white/10 px-5 py-4 text-sm">
                {["Class 1 - 5 (Primary)", "Class 6 - 8 (Lower Sec.)", "Class 9 - 10 (SEE)", "Class 11 - 12 (+2)"].map((cls) => (
                  <div key={cls} className="flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{cls}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4">
                <a href="#contact" className="block rounded-sm bg-white py-2.5 text-center text-sm font-bold text-[#e8841a] transition-colors hover:bg-gray-100">
                  Apply Online ›
                </a>
              </div>
            </div>

            <div id="notices" className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-[#1a3a6b] px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-[#e8841a]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Notices</h3>
                </div>
                <Link href="/notices" className="text-xs text-orange-300 hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-gray-100">
                {notices.map((notice, index) => {
                  const noticeHref = (notice as { link?: string }).link || "#";
                  const noticeSummary = "summary" in notice ? notice.summary : undefined;
                  const noticeImage = "imageUrl" in notice ? notice.imageUrl : undefined;

                  return (
                    <div key={`${notice.title}-${index}`} className="notice-item px-4 py-4 sm:px-5">
                      <div className="notice-badge">
                        <span className="text-base font-extrabold leading-none">{notice.date.day}</span>
                        <span className="text-[0.6rem] uppercase">{notice.date.month}</span>
                      </div>
                      <div>
                        {noticeImage ? (
                          <div className="relative mb-2 aspect-[16/9] w-full max-w-[220px] overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
                            <Image src={noticeImage} alt={notice.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 220px" />
                          </div>
                        ) : null}
                        <Link href={noticeHref} className="block text-sm font-medium leading-snug text-gray-800 hover:text-[#1a3a6b]">
                          {notice.title}
                        </Link>
                        {noticeSummary ? (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                            {noticeSummary}
                          </p>
                        ) : null}
                        <span className={`mt-0.5 inline-block rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${notice.tag === "Event" ? "bg-green-100 text-green-700" : notice.tag === "Result" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                          {notice.tag}
                        </span>
                        <a href={noticeHref} className="ml-2 inline-flex items-center gap-0.5 text-[0.65rem] font-semibold text-[#e8841a] hover:underline">
                          <Download className="h-2.5 w-2.5" /> Open notice
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 bg-[#1a3a6b] px-4 py-3 text-white">
                <CalendarDays className="h-4 w-4 text-[#e8841a]" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Upcoming Events</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {events.map((event, index) => (
                  <div key={`${event.title}-${index}`} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50">
                    <div className="flex-shrink-0 w-12 rounded-sm bg-[#1a3a6b] py-1.5 text-center text-white">
                      <div className="text-xl font-extrabold leading-none">{event.day}</div>
                      <div className="text-[0.6rem] uppercase tracking-wide">{event.month}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-tight text-gray-800">{event.title}</div>
                      <div className="mt-0.5 text-xs text-gray-500">{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="contact" className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 bg-[#1a3a6b] px-4 py-3 text-white">
                <Phone className="h-4 w-4 text-[#e8841a]" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Get in Touch</h3>
              </div>
              <div className="space-y-3 px-4 py-4">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1a3a6b]" />
                  <span className="whitespace-pre-line">{contact.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#1a3a6b]" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#1a3a6b]" />
                  <span className="break-all">{contact.email}</span>
                </div>
                <div className="mt-3 h-36 w-full overflow-hidden rounded border border-gray-200">
                  <iframe
                    src={contact.mapUrl || fallbackContact.mapUrl}
                    title="School Location"
                    className="h-full w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 bg-[#1a3a6b] px-4 py-3 text-white">
                <FileText className="h-4 w-4 text-[#e8841a]" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Downloads</h3>
              </div>
              <div className="space-y-2 px-4 py-3">
                {downloads.map((download, index) => (
                  <a
                    key={`${download.title}-${index}`}
                    href={download.fileUrl || "#"}
                    className="group flex items-center justify-between rounded-sm border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition-all hover:border-[#1a3a6b]/30 hover:bg-blue-50 hover:text-[#1a3a6b]"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-[#e8841a]" />
                      {download.title}
                    </span>
                    <Download className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#1a3a6b]" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section id="gallery" className="border-b border-t border-gray-200 bg-[#f0f4f8] page-section">
        <div className="page-container">
          <h2 className="section-title section-title-center text-center">Photo Gallery</h2>
          <p className="mb-8 text-center text-sm text-gray-500">Capturing memories from our school&apos;s academic and co-curricular activities.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {galleryImages.map((photo, index) => (
              <div key={`${photo.title}-${index}`} className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm border border-gray-200 bg-gray-200 transition-all hover:border-[#1a3a6b]/40">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2744]/55 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-2 left-2 right-2 text-[11px] font-medium leading-tight text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {photo.title}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="inline-flex items-center gap-1.5 rounded-sm bg-[#1a3a6b] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f2744]">
              View Full Gallery <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
