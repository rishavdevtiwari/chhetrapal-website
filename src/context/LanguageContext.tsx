"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ne";

export function getSafeLanguage(cookieValue: string | undefined): Language {
  return cookieValue === "ne" ? "ne" : "en";
}

export type TranslationKey =
  | "schoolName"
  | "schoolAddress"
  | "home"
  | "about"
  | "academics"
  | "alumni"
  | "scholarships"
  | "gallery"
  | "notices"
  | "contact"
  | "onlineAdmission"
  | "admissionOpen"
  | "applyOnline"
  | "viewAdmissionNotice"
  | "requiredDocuments"
  | "feeSnapshot"
  | "admissionForm"
  | "availableClasses"
  | "faq"
  | "downloadCorner"
  | "subscribeNotices"
  | "weeklyRoutine"
  | "readMore"
  | "close"
  | "seeAll"
  | "publishDate"
  | "phone"
  | "email"
  | "officeHours"
  | "searchPlaceholder"
  | "subscribe";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    schoolName: "Chhetrapal Secondary School",
    schoolAddress: "Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal",
    home: "Home",
    about: "About Us",
    academics: "Academics",
    alumni: "Alumni",
    scholarships: "Scholarships",
    gallery: "Gallery",
    notices: "Notices",
    contact: "Contact",
    onlineAdmission: "Online Admission",
    admissionOpen: "Admission Open",
    applyOnline: "Apply Online ›",
    viewAdmissionNotice: "View Admission Notice",
    requiredDocuments: "Required Documents",
    feeSnapshot: "Fee Snapshot",
    admissionForm: "Online Admission Application Form",
    availableClasses: "Available Classes",
    faq: "Frequently Asked Questions",
    downloadCorner: "Download Corner",
    subscribeNotices: "Subscribe to Notices",
    weeklyRoutine: "Weekly Class Routine",
    readMore: "Read More",
    close: "Close",
    seeAll: "View All",
    publishDate: "Published",
    phone: "Phone",
    email: "Email",
    officeHours: "Office Hours",
    searchPlaceholder: "Search notices...",
    subscribe: "Subscribe",
  },
  ne: {
    schoolName: "क्षेत्रपाल माध्यमिक विद्यालय",
    schoolAddress: "लिखु गाउँपालिका वडा नं. ४, चौघडा नुवाकोट, बागमती प्रदेश, नेपाल",
    home: "गृह पृष्ठ",
    about: "हाम्रो बारेमा",
    academics: "शैक्षिक",
    alumni: "भूतपूर्व विद्यार्थी",
    scholarships: "छात्रवृत्ति",
    gallery: "ग्यालरी",
    notices: "सूचनाहरू",
    contact: "सम्पर्क",
    onlineAdmission: "अनलाइन भर्ना",
    admissionOpen: "भर्ना खुल्यो",
    applyOnline: "अनलाइन आवेदन ›",
    viewAdmissionNotice: "भर्ना सूचना हेर्नुहोस्",
    requiredDocuments: "आवश्यक कागजातहरू",
    feeSnapshot: "शुल्क विवरण",
    admissionForm: "अनलाइन भर्ना आवेदन फारम",
    availableClasses: "उपलब्ध कक्षाहरू",
    faq: "बारम्बार सोधिने प्रश्नहरू (FAQ)",
    downloadCorner: "डाउनलोड कुना",
    subscribeNotices: "सूचनाहरूको सदस्यता लिनुहोस्",
    weeklyRoutine: "साप्ताहिक वर्ग तालिका",
    readMore: "थप पढ्नुहोस्",
    close: "बन्द गर्नुहोस्",
    seeAll: "सबै हेर्नुहोस्",
    publishDate: "प्रकाशित मिति",
    phone: "फोन",
    email: "इमेल",
    officeHours: "कार्यालय समय",
    searchPlaceholder: "सूचनाहरू खोज्नुहोस्...",
    subscribe: "सदस्यता लिनुहोस्",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved === "en" || saved === "ne") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.cookie = `chhetrapal_lang=${lang}; path=/; max-age=31536000;`;
    
    // Set google translate cookie to match selection
    if (lang === "ne") {
      document.cookie = "googtrans=/en/ne; path=/;";
      document.cookie = "googtrans=/en/ne; path=/; domain=" + window.location.hostname + ";";
    } else {
      document.cookie = "googtrans=/en/en; path=/;";
      document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname + ";";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
    }
    
    window.location.reload();
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
