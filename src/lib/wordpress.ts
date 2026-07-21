export type CmsHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
};

export type CmsNotice = {
  id?: number;
  date: { day: string; month: string };
  title: string;
  summary?: string;
  content?: string;
  tag: "Notice" | "Event" | "Result";
  showInScroller?: boolean;
  link?: string;
  imageUrl?: string;
};

export type CmsPrincipal = {
  name: string;
  title: string;
  message: string;
  photoUrl: string;
  designation: string;
  link?: string;
};

export type CmsCard = {
  label: string;
  desc: string;
  sub: string;
  imageUrl?: string;
  link?: string;
};

export type CmsDownload = {
  title: string;
  desc: string;
  buttonLabel: string;
  fileUrl: string;
  imageUrl?: string;
};

export type CmsGalleryItem = {
  src: string;
  alt: string;
  title: string;
  link?: string;
};

export type CmsAlumni = {
  name: string;
  year: string;
  achievement: string;
  bio: string;
  photoUrl: string;
  link?: string;
};

export type CmsScholarship = {
  studentName: string;
  scholarshipTitle: string;
  year: string;
  details: string;
  photoUrl?: string;
  link?: string;
};

export type CmsRoutineItem = {
  day: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
};

export type CmsAdmissionOpening = {
  status: "open" | "closed";
  classes: string;
  noticeUrl: string;
  title: string;
  content: string;
};

export type CmsContact = {
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  link?: string;
  privacyPolicy?: string;
  emergencyAlert?: string;
  feeStructure?: string;
  scholarshipRules?: string;
};

export type CmsSourceStatus = "cms" | "wp-fallback" | "local-fallback";

export type HomepageCmsResponse = {
  data: HomepageCmsData;
  sourceStatus: CmsSourceStatus;
};

export type HomepageCmsData = {
  hero: CmsHero;
  notices: CmsNotice[];
  principal: CmsPrincipal;
  programs: CmsCard[];
  facilities: CmsCard[];
  downloads: CmsDownload[];
  gallery: CmsGalleryItem[];
  alumni: CmsAlumni[];
  scholarships: CmsScholarship[];
  contact: CmsContact;
  stats: Array<{ value: string; label: string }>;
  routine?: CmsRoutineItem[];
  admissions?: CmsAdmissionOpening;
  marqueeNotices?: string[];
};

const DEFAULT_WP_API_BASE = "/wp-json/wp/v2";
const DEFAULT_HOMEBASE = "/wp-json/chhetrapal/v1/homepage";
const DEFAULT_WP_ORIGIN = "http://127.0.0.1:9400";
const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_INTERNAL_TOKEN = "chhetrapal-dev-internal-token";

function toAbsoluteUrl(url: string, origin: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
}

function getWordPressOrigin(): string {
  return (
    process.env.WORDPRESS_INTERNAL_ORIGIN ||
    process.env.NEXT_PUBLIC_WORDPRESS_ORIGIN ||
    DEFAULT_WP_ORIGIN
  );
}

function isSafeCmsUrl(url: string): boolean {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return false;
  }

  if (trimmedUrl.startsWith("/")) {
    return true;
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return true;
  }

  return false;
}

function rewriteCmsMediaPath(pathname: string): string {
  if (pathname.startsWith("/wp-content/")) {
    return `/_media/${pathname.replace(/^\/wp-content\//, "")}`;
  }

  return pathname;
}

function normalizeCmsUrl(url: string | undefined, wpOrigin: string): string {
  if (!url) {
    return "";
  }

  const trimmedUrl = url.trim();

  if (!isSafeCmsUrl(trimmedUrl)) {
    return "";
  }

  try {
    const parsed = new URL(trimmedUrl);
    if (parsed.pathname.includes("/wp-content/")) {
      const idx = parsed.pathname.indexOf("/wp-content/");
      return parsed.pathname.substring(idx) + parsed.search + parsed.hash;
    }
    if (parsed.pathname.includes("/wp-includes/")) {
      const idx = parsed.pathname.indexOf("/wp-includes/");
      return parsed.pathname.substring(idx) + parsed.search + parsed.hash;
    }
  } catch {
    // Treat as relative URL
  }

  if (trimmedUrl.startsWith("/")) {
    return trimmedUrl;
  }

  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return `/${trimmedUrl.replace(/^\/+/, "")}`;
  }

  return trimmedUrl;
}

function rewriteHtmlMediaPaths(html: string, wpOrigin: string): string {
  if (!html) return "";
  let rewritten = html;
  // Replace absolute WordPress uploads or wp-content references to relative /wp-content/
  rewritten = rewritten.replace(/https?:\/\/[^\s"'()>]+\/wp-content\//gi, "/wp-content/");
  // Replace relative /wp-content/ references
  rewritten = rewritten.replace(/\/wp-content\//gi, "/wp-content/");
  return rewritten;
}

function stripDuplicateImageFromHtml(html: string, featuredImageUrl: string): string {
  if (!html) return "";
  if (!featuredImageUrl) return html;

  let filename = featuredImageUrl;
  try {
    const parts = featuredImageUrl.split('/');
    filename = parts[parts.length - 1];
  } catch {
    // Fallback to full comparison
  }

  if (!filename) return html;

  const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const figureRegex = new RegExp(
    `<figure[^>]*>\\s*(?:<a[^>]*>\\s*)?<img[^>]+src=["\'][^"\']*` +
    escapedFilename +
    `[^"\']*["\'][^>]*>\\s*(?:<\/a>\\s*)?<\/figure>`,
    'gi'
  );
  let cleaned = html.replace(figureRegex, "");

  const imgRegex = new RegExp(
    `<img[^>]+src=["\'][^"\']*` +
    escapedFilename +
    `[^"\']*["\'][^>]*>`,
    'gi'
  );
  cleaned = cleaned.replace(imgRegex, "");

  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, "");

  return cleaned;
}

function sanitizeText(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

/** Replace known old placeholder values from the WP database with correct school details. */
function correctPlaceholder(value: string, field: "phone" | "address"): string {
  if (field === "phone") {
    if (/^\+?977[-\s]*10[-\s]*X+$/i.test(value) || /X{4,}/.test(value)) {
      return "9851181243";
    }
  }
  if (field === "address") {
    if (/Chhetrapal,?\s*Nuwakot/i.test(value)) {
      return "Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal";
    }
  }
  return value;
}

function wpautop(text: string): string {
  if (!text) return "";
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (/<p>|<br\s*\/?>/i.test(normalized)) {
    return normalized;
  }
  return normalized
    .split(/\n\n+/)
    .map((paragraph) => {
      const pText = paragraph.trim();
      if (!pText) return "";
      const withBreaks = pText.replace(/\n/g, "<br/>");
      return `<p>${withBreaks}</p>`;
    })
    .filter(Boolean)
    .join("");
}

// Nepali translation mapping for default seeded CMS values
const DEFAULT_CMS_NEPALI_MAP: Record<string, string> = {
  // Hero
  "Chhetrapal Secondary School": "क्षेत्रपाल माध्यमिक विद्यालय",
  "Chhetrapal Government School": "क्षेत्रपाल माध्यमिक विद्यालय",
  "Government Secondary School • Est. 2016 BS": "सरकारी माध्यमिक विद्यालय • स्था. २०१६ वि.सं.",
  "WordPress Website": "क्षेत्रपाल माध्यमिक विद्यालय",
  "WordPress Site": "क्षेत्रपाल माध्यमिक विद्यालय",
  "Content fallback mode": "सामग्री ब्याकअप मोड",
  "Offline fallback mode": "अफलाइन ब्याकअप मोड",
  "A school website with centrally managed notices, staff, facilities, downloads, and contact updates.":
    "केन्द्रिय रूपमा व्यवस्थित सूचनाहरू, कर्मचारी, सुविधाहरू, डाउनलोडहरू र सम्पर्क विवरणहरू भएको विद्यालयको वेबसाइट।",
  "The live content source is temporarily unavailable, so fallback content is being shown.":
    "सक्रिय सामग्री स्रोत अस्थायी रूपमा उपलब्ध छैन, त्यसैले पूर्वनिर्धारित सामग्री देखाइएको छ।",
  "Both remote content sources are unavailable, so bundled local fallback content is shown.":
    "दुवै टाढाका सामग्री स्रोतहरू उपलब्ध छैनन्, त्यसैले स्थानीय बन्डल गरिएको सामग्री देखाइएको छ।",

  // Principal
  "Hari Prasad Subedi": "हरिप्रसाद सुवेदी",
  "Principal": "प्रधानाध्यापक",
  "Principal's Welcome Message": "प्रधानाध्यापकको सन्देश",
  "Principal's Message": "प्रधानाध्यापकको सन्देश",
  "Message from Principal": "प्रधानाध्यापकको सन्देश",
  "Please add the principal message in the editor.": "कृपया सम्पादकमा प्रधानाध्यापकको सन्देश थप गर्नुहोस्।",
  "Please publish the principal message in the editor.": "कृपया सम्पादकमा प्रधानाध्यापकको सन्देश थप गर्नुहोस्।",

  // Programs
  "Primary Level": "प्राथमिक तह",
  "Class 1-5": "कक्षा १-५",
  "Foundation of life-long learning": "जीवनपर्यन्त सिकाइको जग",
  "Lower Secondary": "निम्न माध्यमिक तह",
  "Class 6-8": "कक्षा ६-८",
  "Building analytical thinking": "विश्लेषणात्मक सोचको विकास",
  "Secondary Level": "माध्यमिक तह",
  "Class 9-10": "कक्षा ९-१०",
  "SEE Board Examination": "एस.ई.ई. बोर्ड परीक्षा",
  "+2 Level": "+२ तह",
  "Class 11-12": "कक्षा ११-१२",
  "Science and Management Streams": "विज्ञान र व्यवस्थापन संकायहरू",
  "Science & Management Streams": "विज्ञान र व्यवस्थापन संकायहरू",

  // Facilities
  "Library": "पुस्तकालय",
  "Digital Library": "डिजिटल पुस्तकालय",
  "Reading and reference books": "पढ्ने र सन्दर्भ पुस्तकहरू",
  "Science Lab": "विज्ञान प्रयोगशाला",
  "Science Labs": "विज्ञान प्रयोगशाला",
  "Hands-on science practice": "प्रयोगात्मक विज्ञान अभ्यास",
  "Computer Lab": "कम्प्युटर प्रयोगशाला",
  "ICT Computer Lab": "कम्प्युटर प्रयोगशाला",
  "Digital learning space": "डिजिटल सिकाइ क्षेत्र",
  "Sports Ground": "खेलकुद मैदान",
  "Sports Facility": "खेलकुद मैदान",
  "Play and physical activities": "खेल र शारीरिक गतिविधिहरू",
  "Art Room": "कला कोठा",
  "Creative learning activities": "सिर्जनात्मक सिकाइ गतिविधिहरू",
  "Canteen": "क्यान्टिन",
  "School Canteen": "क्यान्टिन",
  "Student refreshment area": "विद्यार्थी खाजा क्षेत्र",

  // Downloads
  "Admission Form 2083": "भर्ना आवेदन फारम २०८३",
  "School Prospectus": "विद्यालय पुस्तिका (Prospectus)",
  "School Prospectus (PDF)": "विद्यालय पुस्तिका (Prospectus)",
  "Academic Calendar 2083": "शैक्षिक क्यालेन्डर २०८३",
  "Fee Structure 2083": "शुल्क विवरण २०८३",
  "Editable admission form": "सम्पादन योग्य भर्ना फारम",
  "Current school prospectus": "हालको विद्यालय पुस्तिका",
  "Yearly academic calendar": "वार्षिक शैक्षिक क्यालेन्डर",
  "Updated fee structure": "अद्यावधिक शुल्क विवरण",
  "Download document": "कागजात डाउनलोड गर्नुहोस्",
  "Download": "डाउनलोड",

  // Stats
  "Academic Staff": "शैक्षिक कर्मचारी",
  "Active Students": "सक्रिय विद्यार्थीहरू",
  "SEE Pass Rate": "एस.ई.ई. उत्तीर्ण दर",
  "Years of History": "वर्षको इतिहास",
  "Years Legacy": "वर्षको इतिहास",
  "Students": "विद्यार्थीहरू",
  "Expert Staff": "विज्ञ कर्मचारी",
  "Pass Rate": "उत्तीर्ण दर",
  "35+": "३५+",
  "55+": "५५+",
  "98%": "९८%",
  "1,200+": "१,२००+",
  "850+": "८५०+",
  "100%": "१००%",
  "60+": "६०+",
  "600+": "६००+",
  "30+": "३०+",
  "93%+": "९३%+",
  "50+": "५०+",

  // Admissions
  "Admissions Open!": "भर्ना खुल्यो!",
  "Academic Year 2026/2027": "शैक्षिक सत्र २०८३/२०८४",
  "Class 1-5 (Primary), Class 6-8 (Lower Sec.), Class 9-10 (SEE), Class 11-12 (+2)": 
    "कक्षा १-५ (प्राथमिक), कक्षा ६-८ (निम्न माध्यमिक), कक्षा ९-१० (एसईई), कक्षा ११-१२ (+२)",

  // Contact
  "Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal":
    "लिखु गाउँपालिका वडा नं. ४, चौघडा नुवाकोट, बागमती प्रदेश, नेपाल",
  "Likhu Rural Municipality-4, Chaughada, Nuwakot, Nepal":
    "लिखु गाउँपालिका वडा नं. ४, चौघडा नुवाकोट, बागमती प्रदेश, नेपाल",

  // Notices
  "First Term Examination Routine 2083": "प्रथम त्रैमासिक परीक्षा तालिका २०८३",
  "Annual Sports Day Programme - Registration Open": "वार्षिक खेलकुद दिवस कार्यक्रम - दर्ता खुल्यो",
  "Parent-Teacher Meeting: All Grades": "अभिभावक-शिक्षक बैठक: सबै कक्षा",
  "SEE Practical Examination Schedule Released": "एसईई प्रयोगात्मक परीक्षा तालिका सार्वजनिक",
  "Scholarship Application Form Available Now": "छात्रवृत्ति आवेदन फारम उपलब्ध छ",
  "Winter Break Notice and Holiday Calendar 2083": "जाडो बिदाको सूचना र बिदाको क्यालेन्डर २०८३",
  "Update this notice content from the WordPress admin.": "यो सूचनाको विवरण वर्डप्रेस एडमिनबाट परिवर्तन गर्नुहोस्।",
  "School notice": "विद्यालयको सूचना",
  "Class 11 Final Board Exam Results Released": "कक्षा ११ को अन्तिम बोर्ड परीक्षाको नतिजा प्रकाशित",
  "Winter Vacation Holiday Notice for All Classes": "सबै कक्षाका लागि जाडो बिदाको सूचना",

  // Alumni
  "Dr. Sandesh Adhikari": "डा. सन्देश अधिकारी",
  "2062 BS Batch": "२०६२ वि.सं. ब्याच",
  "Chief Medical Officer": "प्रमुख चिकित्सा अधिकारी",
  "Graduated with top marks and completed medical degrees in Kathmandu. Continues to serve rural healthcare programs across central Nepal.":
    "उत्कृष्ट अंकका साथ स्नातक गरी काठमाडौंमा चिकित्साशास्त्र अध्ययन पूरा गर्नुभयो। मध्य नेपालका ग्रामीण स्वास्थ्य कार्यक्रमहरूमा निरन्तर सेवा गर्दै हुनुहुन्छ।",
  "Er. Ramesh Shrestha": "इ. रमेश श्रेष्ठ",
  "2065 BS Batch": "२०६५ वि.सं. ब्याच",
  "Lead Infrastructure Engineer": "प्रमुख पूर्वाधार इन्जिनियर",
  "Honored for managing key road-network expansion and school rebuilding projects after regional earthquakes.":
    "भूकम्पपछि सडक सञ्जाल विस्तार र विद्यालय पुनर्निर्माण परियोजनाहरू कुशलतापूर्वक व्यवस्थापन गरेबापत सम्मानित।",
  "Sunita Tamang": "सुनिता तामाङ",
  "2070 BS Batch": "२०७० वि.सं. ब्याच",
  "Chartered Accountant": "चार्टर्ड एकाउन्टेन्ट",
  "Currently supervising financial audits for major corporations and running non-profit accounting mentorship initiatives.":
    "हाल ठूला कर्पोरेसनहरूको वित्तीय लेखापरीक्षणको पर्यवेक्षण र गैर-नाफामूलक लेखा मेन्टरसिप पहलहरू सञ्चालन गर्दै हुनुहुन्छ।",

  // Scholarships
  "Sujan Bhandari": "सुजन भण्डारी",
  "District Merit Scholarship": "जिल्ला योग्यता छात्रवृत्ति",
  "2025": "२०२५",
  "Awarded for outstanding SEE results and consistent academic excellence.":
    "उत्कृष्ट एसईई नतिजा र निरन्तर शैक्षिक उत्कृष्टताको लागि प्रदान गरिएको।",
  "Nisha Gurung": "निशा गुरुङ",
  "Girls in STEM Scholarship": "स्टेममा छात्राहरू छात्रवृत्ति",
  "Recognized for exceptional performance in science and mathematics.":
    "विज्ञान र गणितमा असाधारण प्रदर्शनको लागि मान्यता प्राप्त।",
  "Prabin Tamang": "प्रबिन तामाङ",
  "Community Leadership Grant": "सामुदायिक नेतृत्व अनुदान",
  "2024": "२०२४",
  "Honored for community service and leadership in youth programs.":
    "युवा कार्यक्रमहरूमा सामुदायिक सेवा र नेतृत्वको लागि सम्मानित।",
};

function translateText(text: string, lang?: string): string {
  if (lang !== "ne" || !text) return text;
  const trimmed = text.trim();
  if (DEFAULT_CMS_NEPALI_MAP[trimmed]) {
    return DEFAULT_CMS_NEPALI_MAP[trimmed];
  }
  // Check substring matches for larger texts
  if (trimmed.includes("Respected parents, teachers") || trimmed.includes("Respected parents, teachers, staff")) {
    return `आदरणीय अभिभावक, शिक्षक शिक्षिका, कर्मचारी वर्ग तथा प्रिय विद्यार्थी भाइबहिनीहरू,<br/><br/>नुवाकोट जिल्लाकै पुरानो र ऐतिहासिक शैक्षिक धरोहर क्षेत्रपाल माध्यमिक विद्यालय को आधिकारिक वेबसाइटमा यहाँहरू सबैलाई हार्दिक स्वागत गर्दछु।<br/><br/>वि.सं. २०१६ सालदेखि सुरु भएको यस विद्यालयको शैक्षिक यात्रा आज यो उचाइमा आइपुग्नुमा यस क्षेत्रका बुद्धिजीवी, शिक्षाप्रेमी, आदरणीय अभिभावक र शिक्षक शिक्षिकाहरूको अथक प्रयास, त्याग र समर्पणको परिणाम हो। वि.सं. २०३१ साल चैत्र १६ गते माध्यमिक विद्यालयको रूपमा औपचारिक रूपमा स्थापित भएयता यस विद्यालयले गुणस्तरीय शिक्षाको क्षेत्रमा जिल्लामै एक छुट्टै पहिचान बनाउन सफल भएको छ।<br/><br/>हाम्रो मुख्य उद्देश्य केवल किताबी ज्ञान दिनु मात्र होइन, बरु विद्यार्थीहरूमा लुकेको प्रतिभालाई प्रस्फुटन गराई उनीहरूलाई नैतिकवान्, आत्मनिर्भर र समाजप्रति उत्तरदायी नागरिक बनाउनु हो। बदलिँदो समयसँगै हामीले विद्यालयको भौतिक तथा प्राविधिक पूर्वाधार परिमार्जन गर्दै प्रविधिमैत्री र व्यावहारिक शिक्षण पद्धतिलाई आत्मसाथ गरिरहेका छौँ। जसकै फलस्वरूप हाम्रो शैक्षिक नतिजा निरन्तर उत्कृष्ट रहँदै आएको छ।<br/><br/>विद्यालयको सर्वाङ्गीण विकास र विद्यार्थीहरूको उज्ज्वल भविष्यका लागि हामी सधैँ प्रतिबद्ध छौँ। विद्यालयलाई अझ परिष्कृत र उत्कृष्ट बनाउन यहाँहरूबाट रचनात्मक सल्लाह, सुझाव र निरन्तर सहयोगको अपेक्षा गर्दछौँ।<br/><br/>धन्यवाद।<br/><br/>हरि प्रसाद सुवेदी<br/>प्रधानाध्यापक`;
  }
  if (trimmed.includes("This Privacy Policy describes how")) {
    return `यो गोपनीयता नीतिले विद्यार्थी, अभिभावक र आगन्तुकहरूद्वारा प्रदान गरिएको व्यक्तिगत जानकारीको संकलन, प्रयोग र सुरक्षाको बारेमा जानकारी दिन्छ।\n\nहामी तपाईंले हाम्रो अनलाइन भर्ना पोर्टल प्रयोग गर्दा, सोधपुछ बुझाउँदा वा विद्यालयसँग सञ्चार गर्दा व्यक्तिगत जानकारी संकलन गर्दछौं। यसमा सम्पर्क जानकारी (जस्तै नाम, फोन नम्बर, र इमेल ठेगाना), विद्यार्थी शैक्षिक अभिलेख, जन्म मिति, र अभिभावकको विवरण समावेश हुन्छ।\n\nसंकलित जानकारी विद्यालय प्रशासन, शैक्षिक मूल्यांकन, भर्ना प्रक्रिया र सञ्चारका लागि मात्र प्रयोग गरिन्छ। हामी तपाईंको व्यक्तिगत विवरणहरू तेस्रो-पक्ष विज्ञापन सेवाहरूसँग बेच्ने वा साझा गर्दैनौं।\n\nहामी तपाईंको डाटालाई अनधिकृत पहुँच, परिमार्जन वा खुलासाबाट जोगाउन उपयुक्त भौतिक, प्राविधिक र प्रशासनिक सुरक्षा उपायहरू लागू गर्छौं। अनलाइन आवेदन डाटा सुरक्षित रूपमा भण्डारण गरिन्छ र केवल अधिकृत विद्यालय कर्मचारीहरूले मात्र पहुँच गर्न सक्छन्।\n\nहाम्रो वेबसाइटले नेभिगेसन सहज बनाउन र भाषा प्राथमिकताहरू (जस्तै नेपालीमा अनुवाद गर्ने) समर्थन गर्न आधारभूत कुकीहरू प्रयोग गर्दछ। कुनै हानिकारक ट्र्याकिङ कुकीहरू प्रयोग गरिएका छैनन्।`;
  }
  return text;
}

function cleanNepaliPrincipalMessage(message: string): string {
  if (!message) return message;
  // Remove "क्षेत्रपाल माध्यमिक विद्यालय, लिखु ४, चौघडा नुवाकोट, नेपाल।" (with variations in spaces, newlines, and br tags)
  const regex = /क्षेत्रपाल\s*माध्यमिक\s*विद्यालय,?\s*(?:<br\s*\/?>|\n|\r|\s)*लिखु\s*[४4],?\s*चौघडा\s*नुवाकोट,?\s*नेपाल।?/gi;
  let cleaned = message.replace(regex, "");
  // Clean up potential trailing <br/>, commas, or extra newlines/spaces at the end of the message
  cleaned = cleaned.replace(/(?:<br\s*\/?>|\n|\r|\s|,।)+$/, "");
  return cleaned;
}

function normalizeHomepageData(payload: Partial<HomepageCmsData> | null | undefined, wpOrigin: string, lang?: string): HomepageCmsData {
  const safePayload = payload ?? {};
  
  let heroTitle = safePayload.hero?.title ? sanitizeText(safePayload.hero.title) : "";
  if (!heroTitle || heroTitle === "WordPress Website" || heroTitle === "WordPress Site" || heroTitle.toLowerCase().includes("wordpress")) {
    heroTitle = "Chhetrapal Secondary School";
  }
  let heroEyebrow = safePayload.hero?.eyebrow ? sanitizeText(safePayload.hero.eyebrow) : "";
  if (!heroEyebrow || heroEyebrow === "WordPress Website" || heroEyebrow === "WordPress Site" || heroEyebrow.toLowerCase().includes("wordpress")) {
    heroEyebrow = "Chhetrapal Secondary School";
  }

  heroTitle = translateText(heroTitle, lang);
  heroEyebrow = translateText(heroEyebrow, lang);
  const heroSubtitle = translateText(safePayload.hero?.subtitle ? sanitizeText(safePayload.hero.subtitle) : "", lang);
  const heroDescription = translateText(safePayload.hero?.description ? sanitizeText(safePayload.hero.description) : "", lang);

  return {
    hero: {
      title: heroTitle,
      eyebrow: heroEyebrow,
      subtitle: heroSubtitle,
      description: heroDescription,
    },
    notices: (safePayload.notices ?? []).map((notice) => ({
      ...notice,
      title: translateText(sanitizeText(notice.title), lang),
      summary: notice.summary ? translateText(sanitizeText(notice.summary), lang) : undefined,
      content: notice.content ? translateText(rewriteHtmlMediaPaths(notice.content, wpOrigin), lang) : undefined,
      showInScroller: Boolean(notice.showInScroller),
      link: normalizeCmsUrl(notice.link, wpOrigin),
      imageUrl: normalizeCmsUrl(notice.imageUrl, wpOrigin),
    })),
    principal: {
      name: translateText(safePayload.principal?.name ? sanitizeText(safePayload.principal.name) : "", lang),
      title: translateText(safePayload.principal?.title ? sanitizeText(safePayload.principal.title) : "", lang),
      message: (() => {
        let msg = translateText(safePayload.principal?.message ? wpautop(safePayload.principal.message) : "", lang);
        if (lang === "ne") {
          msg = cleanNepaliPrincipalMessage(msg);
        }
        return msg;
      })(),
      photoUrl: safePayload.principal?.photoUrl ? normalizeCmsUrl(safePayload.principal.photoUrl, wpOrigin) : "",
      designation: translateText(safePayload.principal?.designation ? sanitizeText(safePayload.principal.designation) : "", lang),
      link: safePayload.principal?.link ? normalizeCmsUrl(safePayload.principal.link, wpOrigin) : "",
    },
    programs: (safePayload.programs ?? []).map((program) => ({
      ...program,
      label: translateText(sanitizeText(program.label), lang),
      desc: translateText(sanitizeText(program.desc), lang),
      sub: translateText(sanitizeText(program.sub), lang),
      imageUrl: normalizeCmsUrl(program.imageUrl, wpOrigin),
      link: normalizeCmsUrl(program.link, wpOrigin),
    })),
    facilities: (safePayload.facilities ?? []).map((facility) => ({
      ...facility,
      label: translateText(sanitizeText(facility.label), lang),
      desc: translateText(sanitizeText(facility.desc), lang),
      sub: translateText(sanitizeText(facility.sub), lang),
      imageUrl: normalizeCmsUrl(facility.imageUrl, wpOrigin),
      link: normalizeCmsUrl(facility.link, wpOrigin),
    })),
    downloads: (safePayload.downloads ?? []).map((download) => ({
      ...download,
      title: translateText(sanitizeText(download.title), lang),
      desc: translateText(sanitizeText(download.desc), lang),
      buttonLabel: translateText(sanitizeText(download.buttonLabel), lang),
      fileUrl: normalizeCmsUrl(download.fileUrl, wpOrigin),
      imageUrl: normalizeCmsUrl(download.imageUrl, wpOrigin),
    })),
    gallery: (safePayload.gallery ?? [])
      .filter((photo) => Boolean(photo.src))
      .map((photo) => ({
        ...photo,
        src: normalizeCmsUrl(photo.src, wpOrigin),
        alt: translateText(sanitizeText(photo.alt), lang),
        title: translateText(sanitizeText(photo.title), lang),
        link: normalizeCmsUrl(photo.link, wpOrigin),
      })),
    alumni: (safePayload.alumni ?? []).map((person) => {
      const photoUrl = normalizeCmsUrl(person.photoUrl, wpOrigin);
      return {
        ...person,
        name: translateText(sanitizeText(person.name), lang),
        year: translateText(sanitizeText(person.year), lang),
        achievement: translateText(sanitizeText(person.achievement), lang),
        bio: translateText(person.bio ? stripDuplicateImageFromHtml(rewriteHtmlMediaPaths(person.bio, wpOrigin), photoUrl) : "", lang),
        photoUrl,
        link: normalizeCmsUrl(person.link, wpOrigin),
      };
    }),
    scholarships: (safePayload.scholarships ?? []).map((winner) => {
      const photoUrl = normalizeCmsUrl(winner.photoUrl, wpOrigin);
      return {
        ...winner,
        studentName: translateText(sanitizeText(winner.studentName), lang),
        scholarshipTitle: translateText(sanitizeText(winner.scholarshipTitle), lang),
        year: translateText(sanitizeText(winner.year), lang),
        details: translateText(winner.details ? stripDuplicateImageFromHtml(rewriteHtmlMediaPaths(winner.details, wpOrigin), photoUrl) : "", lang),
        photoUrl,
        link: normalizeCmsUrl(winner.link, wpOrigin),
      };
    }),
    contact: {
      address: translateText(safePayload.contact?.address ? correctPlaceholder(sanitizeText(safePayload.contact.address), "address") : "", lang),
      phone: safePayload.contact?.phone ? correctPlaceholder(sanitizeText(safePayload.contact.phone), "phone") : "",
      email: safePayload.contact?.email ? sanitizeText(safePayload.contact.email) : "",
      mapUrl: safePayload.contact?.mapUrl ? normalizeCmsUrl(safePayload.contact.mapUrl, wpOrigin) : "",
      facebookUrl: safePayload.contact?.facebookUrl ? normalizeCmsUrl(safePayload.contact.facebookUrl, wpOrigin) : "",
      youtubeUrl: safePayload.contact?.youtubeUrl ? normalizeCmsUrl(safePayload.contact.youtubeUrl, wpOrigin) : "",
      twitterUrl: safePayload.contact?.twitterUrl ? normalizeCmsUrl(safePayload.contact.twitterUrl, wpOrigin) : "",
      link: safePayload.contact?.link ? normalizeCmsUrl(safePayload.contact.link, wpOrigin) : "",
      privacyPolicy: safePayload.contact?.privacyPolicy ? translateText(safePayload.contact.privacyPolicy, lang) : undefined,
      emergencyAlert: safePayload.contact?.emergencyAlert ? translateText(sanitizeText(safePayload.contact.emergencyAlert), lang) : undefined,
      feeStructure: safePayload.contact?.feeStructure ? translateText(safePayload.contact.feeStructure, lang) : undefined,
      scholarshipRules: safePayload.contact?.scholarshipRules ? translateText(safePayload.contact.scholarshipRules, lang) : undefined,
    },
    stats: (safePayload.stats ?? []).map((item) => ({
      value: translateText(sanitizeText(item.value), lang),
      label: translateText(sanitizeText(item.label), lang),
    })),
    routine: (safePayload.routine ?? []).map((item) => ({
      day: translateText(sanitizeText(item.day), lang),
      p1: translateText(sanitizeText(item.p1), lang),
      p2: translateText(sanitizeText(item.p2), lang),
      p3: translateText(sanitizeText(item.p3), lang),
      p4: translateText(sanitizeText(item.p4), lang),
      p5: translateText(sanitizeText(item.p5), lang),
    })),
    admissions: safePayload.admissions ? {
      status: safePayload.admissions.status === "closed" ? "closed" : "open",
      classes: translateText(sanitizeText(safePayload.admissions.classes), lang),
      noticeUrl: normalizeCmsUrl(safePayload.admissions.noticeUrl, wpOrigin),
      title: translateText(sanitizeText(safePayload.admissions.title), lang),
      content: translateText(sanitizeText(safePayload.admissions.content), lang),
    } : undefined,
    marqueeNotices: (safePayload.marqueeNotices ?? []).map((notice) => translateText(sanitizeText(notice), lang)),
  };
}

async function fetchJson<T>(url: string, timeoutMs = 4000, headers?: HeadersInit): Promise<T> {
  let attemptError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        cache: "no-store",
        signal: controller.signal,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const text = await response.text();

      try {
        return JSON.parse(text) as T;
      } catch {
        // Some local WP/PHP setups may prepend warnings before valid JSON.
        const firstJsonCharIndex = text.search(/[\[{]/);
        if (firstJsonCharIndex < 0) {
          throw new Error("Response is not JSON");
        }
        return JSON.parse(text.slice(firstJsonCharIndex)) as T;
      }
    } catch (error) {
      attemptError = error;
      if (attempt === 1) {
        throw error;
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw attemptError instanceof Error ? attemptError : new Error("Request failed");
}

export async function getHomepageCmsData(lang?: string): Promise<HomepageCmsData | null> {
  const response = await getHomepageCmsDataWithStatus(lang);
  return response?.data ?? null;
}

export async function getHomepageCmsDataWithStatus(lang?: string): Promise<HomepageCmsResponse | null> {
  const wpOrigin = getWordPressOrigin();
  const base = toAbsoluteUrl(process.env.NEXT_PUBLIC_WORDPRESS_API_BASE || DEFAULT_WP_API_BASE, wpOrigin);
  let homepageUrl = toAbsoluteUrl(process.env.NEXT_PUBLIC_WORDPRESS_HOMEPAGE_API || DEFAULT_HOMEBASE, wpOrigin);
  if (lang) {
    homepageUrl = `${homepageUrl}${homepageUrl.includes("?") ? "&" : "?"}lang=${lang}`;
  }
  const internalToken = process.env.CHHETRAPAL_INTERNAL_TOKEN || DEFAULT_INTERNAL_TOKEN;

  try {
    const payload = await fetchJson<HomepageCmsData>(homepageUrl, DEFAULT_TIMEOUT_MS, {
      "X-Chhetrapal-Internal-Token": internalToken,
    });
    return {
      data: normalizeHomepageData(payload, wpOrigin, lang),
      sourceStatus: "cms",
    };
  } catch {
    try {
      const posts = await fetchJson<Array<{ id: number; date: string; title: { rendered: string } }>>(
        `${base}/posts?per_page=6&_fields=id,date,title`,
        DEFAULT_TIMEOUT_MS
      );

      return {
        sourceStatus: "wp-fallback",
        data: normalizeHomepageData({
          hero: {
            eyebrow: "Chhetrapal Government School",
            title: "Chhetrapal Secondary School",
            subtitle: "Content fallback mode",
            description: "The live content source is temporarily unavailable, so fallback content is being shown.",
          },
          notices: posts.map((post, index) => {
            const date = new Date(post.date);
            return {
              date: {
                day: String(date.getDate()).padStart(2, "0"),
                month: date.toLocaleString("en-US", { month: "short" }),
              },
              title: post.title.rendered.replace(/<[^>]+>/g, ""),
              tag: index === 1 ? "Event" : index === 2 ? "Result" : "Notice",
              showInScroller: true,
            };
          }),
          principal: {
            name: "Principal",
            title: "Principal",
            message: "Please publish the principal message in the editor.",
            photoUrl: "",
            designation: "Principal",
          },
          programs: [],
          facilities: [],
          downloads: [],
          gallery: [],
          alumni: [],
          scholarships: [],
          contact: {
            address: "Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal",
            phone: "9851181243",
            email: "info@chhetrapalschool.edu.np",
            mapUrl: "",
            facebookUrl: "https://www.facebook.com/chhetrapal.mavi/",
            youtubeUrl: "https://www.youtube.com/@kshetrapalbasicschool6645",
            twitterUrl: "#",
          },
          stats: [
            { value: "600+", label: "Students" },
            { value: "30+", label: "Expert Staff" },
            { value: "93%+", label: "Pass Rate" },
            { value: "50+", label: "Years Legacy" },
          ],
        }, wpOrigin, lang),
      };
    } catch {
      return {
        sourceStatus: "local-fallback",
        data: normalizeHomepageData({
          hero: {
            eyebrow: "Chhetrapal Government School",
            title: "Chhetrapal Secondary School",
            subtitle: "Offline fallback mode",
            description: "Both remote content sources are unavailable, so bundled local fallback content is shown.",
          },
          notices: [],
          principal: {
            name: "Principal",
            title: "Principal",
            message: "Please publish the principal message in the editor.",
            photoUrl: "",
            designation: "Principal",
          },
          programs: [],
          facilities: [],
          downloads: [],
          gallery: [],
          alumni: [],
          scholarships: [],
          contact: {
            address: "Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal",
            phone: "9851181243",
            email: "info@chhetrapalschool.edu.np",
            mapUrl: "",
            facebookUrl: "https://www.facebook.com/chhetrapal.mavi/",
            youtubeUrl: "https://www.youtube.com/@kshetrapalbasicschool6645",
            twitterUrl: "#",
          },
          stats: [
            { value: "600+", label: "Students" },
            { value: "30+", label: "Expert Staff" },
            { value: "93%+", label: "Pass Rate" },
            { value: "50+", label: "Years Legacy" },
          ],
        }, wpOrigin, lang),
      };
    }
  }
}

export function shouldShowCmsStatusBadge(): boolean {
  return process.env.SHOW_CMS_STATUS_BADGE === "1" || process.env.SHOW_CMS_STATUS_BADGE === "true";
}
