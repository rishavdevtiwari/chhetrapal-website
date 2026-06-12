import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScholarshipPopup from "@/components/scholarship-popup";
import { getHomepageCmsData } from "@/lib/wordpress";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chhetrapal Secondary School | छेत्रपाल माध्यमिक विद्यालय | Nuwakot, Nepal",
  description:
    "Official website of Chhetrapal Secondary School (छेत्रपाल माध्यमिक विद्यालय), Likhu Rural Municipality Ward No. 4, Chaughada, Nuwakot, Bagmati Province, Nepal. CDC/NEB Reg. No: 28018. Admissions open. Contact: 9851181243.",
  keywords: "Chhetrapal Secondary School, Nepal school, Nuwakot school, Likhu Rural Municipality, Chaughada, SEE exam, NEB affiliated, government school, 28018",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cmsData = await getHomepageCmsData();
  const contact = cmsData?.contact;
  const scholarships = cmsData?.scholarships ?? [];

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar contact={contact} />
        <ScholarshipPopup scholarships={scholarships} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
