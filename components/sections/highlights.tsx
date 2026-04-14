import { Bell, CalendarDays, FileText, Megaphone } from "lucide-react"

const quickItems = [
  {
    icon: Megaphone,
    title: "Important Notice",
    text: "Grade XI entrance interaction schedule and section details are now published.",
  },
  {
    icon: CalendarDays,
    title: "Upcoming Event",
    text: "New session orientation and parent briefing will be held this Sunday at 11:00 AM.",
  },
  {
    icon: FileText,
    title: "Admission Desk",
    text: "Prospectus, fee structure, and online application form are open for 2083 intake.",
  },
  {
    icon: Bell,
    title: "Scholarship Update",
    text: "Merit-based scholarship list for SEE graduates will be announced next week.",
  },
]

export function HighlightsSection() {
  return (
    <section className="wp-section wp-bg-paper py-8 lg:py-10 wp-divider-soft">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {quickItems.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-[var(--navy)]/10 bg-white p-5 shadow-depth"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)]/18 text-[var(--gold-dark)]">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--navy)]/70">
                {title}
              </h3>
            </div>
            <p className="text-[15px] leading-relaxed text-[var(--navy)]/78">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
