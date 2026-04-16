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

// ─── Data ───────────────────────────────────────────────────────────────────

const notices = [
  { date: { day: "15", month: "Baisakh" }, title: "First Term Examination Routine 2083", tag: "Notice" },
  { date: { day: "10", month: "Chaitra" }, title: "Annual Sports Day Programme – Registration Open", tag: "Event" },
  { date: { day: "25", month: "Falgun" }, title: "Parent-Teacher Meeting: All Grades", tag: "Notice" },
  { date: { day: "01", month: "Falgun" }, title: "SEE Practical Examination Schedule Released", tag: "Result" },
  { date: { day: "15", month: "Magh" }, title: "Scholarship Application Form Available Now", tag: "Notice" },
  { date: { day: "05", month: "Magh" }, title: "Winter Break Notice & Holiday Calendar 2083", tag: "Notice" },
];

const programs = [
  { icon: BookOpen, label: "Primary Level", desc: "Class 1–5", sub: "Foundation of life-long learning" },
  { icon: BookOpen, label: "Lower Secondary", desc: "Class 6–8", sub: "Building analytical thinking" },
  { icon: GraduationCap, label: "Secondary Level", desc: "Class 9–10", sub: "SEE Board Examination" },
  { icon: GraduationCap, label: "+ 2 Level", desc: "Class 11–12", sub: "Science & Management Streams" },
];

const events = [
  { month: "Baisakh", day: "22", title: "Annual Prize Distribution", time: "11:00 AM" },
  { month: "Jestha", day: "05", title: "World Environment Day Programme", time: "10:00 AM" },
  { month: "Saun", day: "10", title: "Guru Purnima Celebration", time: "9:30 AM" },
];

const stats = [
  { value: "1,200+", label: "Students" },
  { value: "55+", label: "Expert Staff" },
  { value: "98%", label: "Pass Rate" },
  { value: "35+", label: "Years Legacy" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const galleryImages = [
    { src: "/class-image-1.jpeg", alt: "Students in a classroom session" },
    { src: "/class-image-2.jpeg", alt: "Classroom learning activity" },
    { src: "/student-assembled.jpeg", alt: "Students assembled during school activity" },
    { src: "/student-showcasing-project.jpeg", alt: "Student showcasing a school project" },
    { src: "/teacher-teaching-students.jpeg", alt: "Teacher teaching students in class" },
    { src: "/another-part-of-school.jpeg", alt: "Another part of the school campus" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ═══ HERO SLIDER ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[70vh] min-h-[480px] max-h-[680px] flex items-center justify-center overflow-hidden">
        <Image
          src="/main-entrance-with-school-board.jpeg"
          alt="Main entrance of Chhetrapal Secondary School"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0f2744]/45" />

        {/* Overlay gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-50/60 to-transparent" />

        {/* Text overlay */}
        <div className="relative z-10 text-center px-4">
          <div className="inline-block bg-[#e8841a] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-5">
            Government Secondary School • Est. 2046 BS
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-sm mb-3">
            Chhetrapal Secondary School
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-semibold mb-2">
            छेत्रपाल माध्यमिक विद्यालय
          </p>
          <p className="text-white/85 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Nuwakot, Bagmati Province, Nepal<br/>
            <span className="text-sm text-white/75">Affiliated to National Examination Board (NEB)</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/admissions"
              className="bg-[#e8841a] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-sm text-sm transition-colors shadow"
            >
              Online Admission ›
            </Link>
            <Link
              href="/about"
              className="bg-[#1a3a6b] hover:bg-[#0f2744] text-white font-semibold px-8 py-3 rounded-sm text-sm transition-colors shadow"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═════════════════════════════════════════════════════════ */}
      <section className="bg-[#1a3a6b] text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-3 px-4">
                <div className="text-3xl md:text-4xl font-extrabold text-[#e8841a] leading-tight">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-300 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT AREA (2-col + sidebar) ══════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT MAIN ─────────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Welcome / About Section */}
            <section id="about" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] text-white px-5 py-3">
                <BookOpen className="h-5 w-5 text-[#e8841a]" />
                <h2 className="font-bold text-sm uppercase tracking-widest">Welcome to Our School</h2>
              </div>
              <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6">
                {/* Photo placeholder */}
                <div className="relative flex-shrink-0 w-full md:w-52 h-52 bg-gray-100 border border-gray-200 rounded overflow-hidden">
                  <Image
                    src="/entrance-image.jpeg"
                    alt="School entrance"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 208px"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3a6b] mb-3">About Chhetrapal Secondary School</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Established in 2046 BS (1989 AD), Chhetrapal Secondary School is a government secondary school located in Nuwakot district of Bagmati Province, Nepal. Over the past three decades, we have been serving the educational needs of our community by providing quality education from primary to higher secondary level.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Affiliated to the National Examination Board (NEB) and following the curriculum set by the Curriculum Development Centre (CDC), our institution is proud to have contributed hundreds of successful graduates who are now excelling in various fields across Nepal and abroad.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 bg-[#1a3a6b] text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#0f2744] transition-colors"
                  >
                    Read More <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* Principal's Message */}
            <section id="principal" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] text-white px-5 py-3">
                <Users className="h-5 w-5 text-[#e8841a]" />
                <h2 className="font-bold text-sm uppercase tracking-widest">Principal's Message</h2>
              </div>
              <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="relative w-32 h-36 bg-gray-100 border border-gray-200 rounded overflow-hidden">
                    <Image
                      src="/teacher-teaching-students.jpeg"
                      alt="Principal of Chhetrapal Secondary School"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#1a3a6b] text-sm">Mr. Ram Bahadur Thapa</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Principal</div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 italic border-l-4 border-[#e8841a] pl-4 py-1">
                    "Education is the most powerful weapon which you can use to change the world. At Chhetrapal Secondary School, we are committed to delivering knowledge, nurturing talent, and building character in every student who crosses our doors."
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    On behalf of the entire staff and management of the school, I warmly welcome all students, parents, and guardians to our institution. We remain dedicated to providing a safe, inclusive, and academically stimulating environment for all.
                  </p>
                  <a href="#" className="inline-flex items-center gap-1 text-[#e8841a] text-sm font-semibold mt-3 hover:underline">
                    Read Full Message <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* Academic Programs */}
            <section id="academics" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] text-white px-5 py-3">
                <GraduationCap className="h-5 w-5 text-[#e8841a]" />
                <h2 className="font-bold text-sm uppercase tracking-widest">Academic Programs</h2>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {programs.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-start gap-4 p-4 border border-gray-100 rounded-sm bg-gray-50/60 hover:border-[#1a3a6b]/30 hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  >
                    <div className="flex-shrink-0 h-12 w-12 bg-[#1a3a6b] text-white rounded flex items-center justify-center group-hover:bg-[#e8841a] transition-colors">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1a3a6b] text-base leading-tight">{p.label}</div>
                      <div className="text-[#e8841a] font-semibold text-xs mt-0.5">{p.desc}</div>
                      <div className="text-gray-500 text-xs mt-1">{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Facilities Section */}
            <section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] text-white px-5 py-3">
                <Trophy className="h-5 w-5 text-[#e8841a]" />
                <h2 className="font-bold text-sm uppercase tracking-widest">Our Facilities</h2>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Library, label: "Library" },
                  { icon: FlaskConical, label: "Science Lab" },
                  { icon: Computer, label: "Computer Lab" },
                  { icon: Volleyball, label: "Sports Ground" },
                  { icon: Palette, label: "Art Room" },
                  { icon: UtensilsCrossed, label: "Canteen" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center justify-center py-5 border border-gray-100 rounded-sm bg-gray-50/70 hover:bg-blue-50/40 transition-colors text-center">
                    <f.icon className="h-8 w-8 mb-2 text-[#1a3a6b]" />
                    <span className="text-sm font-semibold text-[#1a3a6b]">{f.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights Section */}
            <section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 bg-[#1a3a6b] text-white px-5 py-3">
                <BadgeCheck className="h-5 w-5 text-[#e8841a]" />
                <h2 className="font-bold text-sm uppercase tracking-widest">School Highlights</h2>
              </div>
              <div className="p-5 grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Microscope,
                    title: "Practical Learning",
                    text: "Hands-on projects and lab-based activities across grades.",
                  },
                  {
                    icon: Medal,
                    title: "Strong Results",
                    text: "Consistent SEE performance and active academic support.",
                  },
                  {
                    icon: Users,
                    title: "Inclusive Culture",
                    text: "Safe, student-friendly environment with co-curricular growth.",
                  },
                ].map((item) => (
                  <article key={item.title} className="border border-gray-100 rounded-sm p-4 bg-gray-50/70 hover:bg-blue-50/40 transition-colors">
                    <item.icon className="h-7 w-7 text-[#1a3a6b] mb-2" />
                    <h3 className="text-sm font-bold text-[#1a3a6b]">{item.title}</h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

          </div>

          {/* ── RIGHT SIDEBAR ──────────────────────────────────────────────────── */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">

            {/* Quick Admission Box */}
            <div className="bg-[#e8841a] text-white rounded-sm overflow-hidden shadow-sm">
              <div className="px-5 py-4 text-center">
                <div className="text-2xl mb-1">🎓</div>
                <h3 className="font-extrabold text-lg leading-tight">Admissions Open!</h3>
                <p className="text-sm text-orange-100 mt-1">Academic Year 2026/2027</p>
              </div>
              <div className="bg-white/10 px-5 py-4 space-y-2 text-sm">
                {["Class 1 – 5 (Primary)", "Class 6 – 8 (Lower Sec.)", "Class 9 – 10 (SEE)", "Class 11 – 12 (+2)"].map((cls) => (
                  <div key={cls} className="flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{cls}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4">
                <a
                  href="#"
                  className="block bg-white text-[#e8841a] font-bold text-center py-2.5 rounded-sm text-sm hover:bg-gray-100 transition-colors"
                >
                  Apply Online ›
                </a>
              </div>
            </div>

            {/* Notice Board */}
            <div id="notices" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center justify-between bg-[#1a3a6b] text-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-[#e8841a]" />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Notices</h3>
                </div>
                <a href="#" className="text-orange-300 text-xs hover:underline">View All</a>
              </div>
              <div className="divide-y divide-gray-100">
                {notices.map((n, i) => (
                  <div key={i} className="notice-item px-4">
                    <div className="notice-badge">
                      <span className="text-base font-extrabold leading-none">{n.date.day}</span>
                      <span className="text-[0.6rem] uppercase">{n.date.month}</span>
                    </div>
                    <div>
                      <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#1a3a6b] leading-snug block">
                        {n.title}
                      </Link>
                      <span className={`text-[0.65rem] font-bold uppercase tracking-wider mt-0.5 inline-block px-1.5 py-0.5 rounded-sm ${n.tag === "Event" ? "bg-green-100 text-green-700" : n.tag === "Result" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                        {n.tag}
                      </span>
                      <a href="#" className="ml-2 inline-flex items-center gap-0.5 text-[0.65rem] text-[#e8841a] hover:underline font-semibold">
                        <Download className="h-2.5 w-2.5" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-3">
                <CalendarDays className="h-4 w-4 text-[#e8841a]" />
                <h3 className="font-bold text-sm uppercase tracking-wider">Upcoming Events</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {events.map((ev, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-12 text-center bg-[#1a3a6b] text-white rounded-sm py-1.5">
                      <div className="text-xl font-extrabold leading-none">{ev.day}</div>
                      <div className="text-[0.6rem] uppercase tracking-wide">{ev.month}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 leading-tight">{ev.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{ev.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Quick Info */}
            <div id="contact" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-3">
                <Phone className="h-4 w-4 text-[#e8841a]" />
                <h3 className="font-bold text-sm uppercase tracking-wider">Get in Touch</h3>
              </div>
              <div className="px-4 py-4 space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-[#1a3a6b] mt-0.5 flex-shrink-0" />
                  <span>Chhetrapal, Nuwakot<br />Bagmati Province, Nepal</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-[#1a3a6b] flex-shrink-0" />
                  <span>+977-10-XXXXXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-[#1a3a6b] flex-shrink-0" />
                  <span className="break-all">info@chhetrapalschool.edu.np</span>
                </div>
                <div className="mt-3 w-full h-36 border border-gray-200 rounded overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.925360626243!2d85.2387678754744!3d27.904263726070322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eadfa5e05bbc35%3A0x3eb57e2564e36dd4!2sShree%20Kshetrapal%20Uchcha%20Madhyamik%20Bidyalaya!5e0!3m2!1sen!2snp!4v1776366200281!5m2!1sen!2snp"
                    title="Shree Kshetrapal Uchcha Madhyamik Bidyalaya Location"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-3">
                <FileText className="h-4 w-4 text-[#e8841a]" />
                <h3 className="font-bold text-sm uppercase tracking-wider">Downloads</h3>
              </div>
              <div className="px-4 py-3 space-y-2">
                {[
                  "Admission Form 2083",
                  "School Prospectus",
                  "Academic Calendar 2083",
                  "Fee Structure 2083",
                ].map((doc) => (
                  <a
                    key={doc}
                    href="#"
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-[#1a3a6b]/30 rounded-sm text-sm text-gray-700 hover:text-[#1a3a6b] transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-[#e8841a]" />
                      {doc}
                    </span>
                    <Download className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#1a3a6b]" />
                  </a>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* ═══ GALLERY STRIP ═════════════════════════════════════════════════════ */}
      <section id="gallery" className="bg-[#f0f4f8] border-t border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="section-title section-title-center text-center">Photo Gallery</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Capturing memories from our school's academic & co-curricular activities.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {galleryImages.map((photo, i) => (
              <div
                key={photo.src}
                className="relative aspect-square bg-gray-200 border border-gray-200 rounded-sm overflow-hidden hover:border-[#1a3a6b]/40 transition-all cursor-pointer group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2744]/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-2 right-2 bottom-2 text-[11px] text-white font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                  Photo {i + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="#" className="inline-flex items-center gap-1.5 bg-[#1a3a6b] text-white text-sm font-semibold px-6 py-2.5 rounded-sm hover:bg-[#0f2744] transition-colors">
              View Full Gallery <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
