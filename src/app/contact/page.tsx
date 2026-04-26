import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getHomepageCmsData } from "@/lib/wordpress";

const fallbackMapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.925360626243!2d85.2387678754744!3d27.904263726070322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eadfa5e05bbc35%3A0x3eb57e2564e36dd4!2sShree%20Kshetrapal%20Uchcha%20Madhyamik%20Bidyalaya!5e0!3m2!1sen!2snp!4v1776366200281!5m2!1sen!2snp";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const cmsData = await getHomepageCmsData();
  const contact = cmsData?.contact;
  const address = contact?.address || "Chhetrapal, Nuwakot, Bagmati Province, Nepal";
  const phone = contact?.phone || "+977-10-XXXXXXXX";
  const email = contact?.email || "info@chhetrapalschool.edu.np";
  const mapUrl = contact?.mapUrl || fallbackMapUrl;

  return (
    <div className="page-shell">
      <section className="bg-[#1a3a6b] text-white py-14 md:py-20">
        <div className="page-container">
          <p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Contact</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Contact and Visit Us</h1>
          <p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
            Contact details and map embed are managed from CMS so office updates do not require code changes.
          </p>
        </div>
      </section>

      <div className="page-container page-section grid lg:grid-cols-[1fr_1.25fr] gap-6">
        <aside className="space-y-4">
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] uppercase tracking-wide">Address</h2>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{address}</p>
            </div>
          </article>
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <Phone className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] uppercase tracking-wide">Phone</h2>
              <p className="text-sm text-gray-600 mt-1">{phone}</p>
            </div>
          </article>
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <Mail className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] uppercase tracking-wide">Email</h2>
              <p className="text-sm text-gray-600 mt-1">{email}</p>
            </div>
          </article>
          <article className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#e8841a] mt-0.5" />
            <div>
              <h2 className="text-sm text-[#1a3a6b] uppercase tracking-wide">Office Hours</h2>
              <p className="text-sm text-gray-600 mt-1">Sun-Fri: 10:00 AM - 4:00 PM</p>
            </div>
          </article>

          <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src={mapUrl}
              title="Shree Kshetrapal Uchcha Madhyamik Bidyalaya Location"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>

        <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="bg-[#1a3a6b] text-white px-5 py-3">
            <h2 className="text-sm uppercase tracking-widest">Send Us a Message</h2>
          </div>
          <form className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">First Name</label>
                <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="First name" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Last Name</label>
                <input type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="Last name" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Email</label>
                <input type="email" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="example@email.com" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Phone</label>
                <input type="tel" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="+977-XXXXXXXXXX" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Subject</label>
              <select className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
                <option>Select subject</option>
                <option>General Enquiry</option>
                <option>Admission</option>
                <option>Academics</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Message</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm" rows={6} placeholder="Write your message" />
            </div>
            <button type="button" className="h-10 px-5 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
