import Image from "next/image";
import Link from "next/link";
import { BookOpen, Target, Eye, Users, Award, ChevronRight } from "lucide-react";

const team = [
  { name: "Mr. Ram Bahadur Thapa", role: "Principal" },
  { name: "Ms. Sita Karki", role: "Vice Principal" },
  { name: "Mr. Nabin Shrestha", role: "Academic Coordinator" },
  { name: "Ms. Gita Bhandari", role: "Administrative Head" },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <Image src="/another-part-of-school.jpeg" alt="School campus" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-[#0f2744]/55" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
          <p className="text-white/80 text-sm uppercase tracking-[0.22em]">About Us</p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mt-2">About Chhetrapal Secondary School</h1>
          <p className="text-white/85 max-w-2xl mt-3 text-sm md:text-base">
            Dummy structure for school profile, history, leadership, and mission. You can replace any text later.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <section id="history" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <BookOpen className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">Our History</h2>
          </div>
          <div className="p-5 grid md:grid-cols-[1.4fr_1fr] gap-6 items-start">
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                Chhetrapal Secondary School was established in 2046 BS with a vision to provide quality public education in Nuwakot.
                This section is a placeholder timeline and school journey narrative.
              </p>
              <p>
                Over time, the school expanded from primary classes to higher secondary education, introducing science, management,
                and practical learning approaches for students from diverse backgrounds.
              </p>
              <p>
                You can later replace this text with exact milestones, notable alumni, community projects, and accreditation history.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-gray-200">
              <Image src="/entrance-image.jpeg" alt="School entrance" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
            </div>
          </div>
        </section>

        <section id="mission" className="grid md:grid-cols-2 gap-6">
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
              <Target className="h-5 w-5 text-[#e8841a]" />
              <h2 className="text-sm uppercase tracking-widest">Our Mission</h2>
            </div>
            <div className="p-5 text-sm text-gray-600 leading-relaxed space-y-3">
              <p>To nurture responsible, creative, and academically strong students through inclusive education.</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Student-centered learning environment</li>
                <li>Balance of academics, values, and co-curricular growth</li>
                <li>Community engagement and social responsibility</li>
              </ul>
            </div>
          </article>

          <article className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
              <Eye className="h-5 w-5 text-[#e8841a]" />
              <h2 className="text-sm uppercase tracking-widest">Our Vision</h2>
            </div>
            <div className="p-5 text-sm text-gray-600 leading-relaxed space-y-3">
              <p>To be a trusted model public school in Nepal known for excellence, equity, and innovation.</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Strong academic outcomes across grades</li>
                <li>Technology and practical skill integration</li>
                <li>Safe and inspiring school culture</li>
              </ul>
            </div>
          </article>
        </section>

        <section id="principal" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <Users className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">Principal's Message</h2>
          </div>
          <div className="p-5 md:p-6 grid md:grid-cols-[160px_1fr] gap-6 items-start">
            <div className="relative w-40 h-44 rounded-sm overflow-hidden border border-gray-200 mx-auto md:mx-0">
              <Image src="/teacher-teaching-students.jpeg" alt="Principal placeholder" fill className="object-cover" sizes="160px" />
            </div>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p className="italic border-l-4 border-[#e8841a] pl-4">
                "This is a placeholder principal message. Replace with your official message and signature block whenever ready."
              </p>
              <p>
                We are committed to building a future-ready generation through discipline, value-based education, and modern teaching
                strategies aligned with national standards.
              </p>
            </div>
          </div>
        </section>

        <section id="management" className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-[#1a3a6b] px-5 py-3 flex items-center gap-3 text-white">
            <Award className="h-5 w-5 text-[#e8841a]" />
            <h2 className="text-sm uppercase tracking-widest">Management Team</h2>
          </div>
          <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <article key={member.name} className="border border-gray-200 rounded-sm p-4 bg-gray-50">
                <div className="h-14 w-14 rounded-full bg-[#1a3a6b] text-white flex items-center justify-center text-lg font-bold mb-3">
                  {member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                </div>
                <h3 className="text-[#1a3a6b] text-sm font-bold leading-tight">{member.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{member.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#1a3a6b] text-white rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">Explore Admissions, Curriculum, and Notices</h2>
            <p className="text-white/80 text-sm mt-2">All pages are UI-ready and content can be replaced later.</p>
          </div>
          <Link href="/admissions" className="inline-flex items-center gap-1.5 bg-[#e8841a] text-white px-5 py-3 rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
            Go to Admissions <ChevronRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
