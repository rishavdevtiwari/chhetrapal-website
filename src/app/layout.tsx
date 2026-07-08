import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScholarshipPopup from "@/components/scholarship-popup";
import { getHomepageCmsData } from "@/lib/wordpress";
import Script from "next/script";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
import { Language, getSafeLanguage } from "@/lib/language";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chhetrapal Secondary School | क्षेत्रपाल माध्यमिक विद्यालय | Nuwakot, Nepal",
  description:
    "Official website of Chhetrapal Secondary School (क्षेत्रपाल माध्यमिक विद्यालय), Likhu Rural Municipality Ward No. 4, Chaughada, Nuwakot, Bagmati Province, Nepal. CDC/NEB Reg. No: 28018, EMIS Code: 280130009. Admissions open. Contact: 9851181243.",
  keywords: "Chhetrapal Secondary School, Nepal school, Nuwakot school, Likhu Rural Municipality, Chaughada, SEE exam, NEB affiliated, government school, 28018, 280130009, EMIS",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const lang = getSafeLanguage(cookieStore.get("chhetrapal_lang")?.value);
  const cmsData = await getHomepageCmsData(lang);
  const contact = cmsData?.contact;
  const scholarships = cmsData?.scholarships ?? [];
  const programs = cmsData?.programs ?? [];
  const marqueeNotices = cmsData?.marqueeNotices ?? [];

  return (
    <html lang={lang} className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider initialLanguage={lang}>
          <Navbar contact={contact} programs={programs} marqueeNotices={marqueeNotices} />
          <ScholarshipPopup scholarships={scholarships} />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <div id="google_translate_element" style={{ display: 'none' }} />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
        >
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'ne',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
