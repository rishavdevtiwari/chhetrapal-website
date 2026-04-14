import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react"

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Programs", href: "#academics" },
  { name: "Facilities", href: "#facilities" },
  { name: "Admissions", href: "#admissions" },
  { name: "Gallery", href: "#gallery" },
  { name: "Notices", href: "#news" },
]

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)] text-[var(--navy)] font-bold">
                C
              </span>
              <div>
                <p className="font-semibold text-lg heading-display">Chhetrapal School</p>
                <p className="text-xs tracking-widest uppercase text-white/60">Est. 1924</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-sm">
              A trusted institution focused on quality education, discipline, and character building.
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-[var(--gold)] font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-[var(--gold)] font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+977-01-4100000" className="hover:text-white transition-colors">+977-01-4100000</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@chhetrapalschool.edu.np" className="hover:text-white transition-colors">info@chhetrapalschool.edu.np</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-[var(--gold)] font-semibold">Connect</h3>
            <div className="mt-4 flex items-center gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>Copyright © 2026 Chhetrapal School. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
