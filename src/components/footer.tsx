import Link from "next/link";
import { BookOpen, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

// Inline brand SVG icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0f2744] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* About School */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="h-10 w-10 bg-white text-[#1a3a6b] rounded flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight">Chhetrapal</div>
              <div className="text-xs text-gray-300 uppercase tracking-wider">Secondary School</div>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            छेत्रपाल माध्यमिक विद्यालय — Nuwakot, Nepal. Powered by belief in quality education for every child, we strive to prepare future leaders of Nepal.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#" aria-label="Facebook" className="h-8 w-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#e8841a] transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Youtube" className="h-8 w-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#e8841a] transition-colors">
              <YoutubeIcon />
            </a>
            <a href="#" aria-label="X / Twitter" className="h-8 w-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#e8841a] transition-colors">
              <XIcon />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 border-b border-white/10 pb-3">Quick Links</h3>
          <ul className="text-sm text-gray-300 space-y-2.5">
            {["Home","About Us","Vision & Mission","Faculty","Academics","Gallery","Notices","Contact Us"].map((item) => (
              <li key={item}>
                <Link href="#" className="flex items-center gap-2 hover:text-[#e8841a] transition-colors group">
                  <ChevronRight className="h-3 w-3 text-[#e8841a] group-hover:translate-x-0.5 transition-transform" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 border-b border-white/10 pb-3">Important Links</h3>
          <ul className="text-sm text-gray-300 space-y-2.5">
            {[
              { label: "Ministry of Education – Nepal", href: "#" },
              { label: "National Examination Board", href: "#" },
              { label: "Curriculum Development Centre", href: "#" },
              { label: "District Education Office", href: "#" },
              { label: "NEB Online Admission", href: "#" },
              { label: "Scholarships Portal", href: "#" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="flex items-center gap-2 hover:text-[#e8841a] transition-colors group" target="_blank" rel="noreferrer">
                  <ChevronRight className="h-3 w-3 text-[#e8841a]" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 border-b border-white/10 pb-3">Contact Us</h3>
          <ul className="text-sm text-gray-300 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#e8841a] mt-0.5 flex-shrink-0" />
              <span>Chhetrapal, Nuwakot<br />Bagmati Province, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#e8841a] flex-shrink-0" />
              <span>+977-10-XXXXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#e8841a] flex-shrink-0" />
              <span>info@chhetrapalschool.edu.np</span>
            </li>
          </ul>
          <div className="mt-6 p-3 bg-white/5 border border-white/10 rounded text-xs text-gray-400 leading-relaxed">
            Office Hours:<br />
            <strong className="text-gray-300">Sun–Fri: 10:00 AM – 4:00 PM</strong><br />
            Saturday & Public Holidays: Closed
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Chhetrapal Secondary School (छेत्रपाल माध्यमिक विद्यालय). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
