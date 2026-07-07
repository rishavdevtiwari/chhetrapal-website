export type CmsHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
};

export type CmsNotice = {
  date: { day: string; month: string };
  title: string;
  summary?: string;
  content?: string;
  tag: "Notice" | "Event" | "Result";
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
      const pathAfter = parsed.pathname.substring(idx + "/wp-content/".length);
      return `${wpOrigin}/wp-content/${pathAfter}${parsed.search}${parsed.hash}`;
    }
    if (parsed.pathname.includes("/wp-includes/")) {
      const idx = parsed.pathname.indexOf("/wp-includes/");
      const pathAfter = parsed.pathname.substring(idx + "/wp-includes/".length);
      return `${wpOrigin}/wp-includes/${pathAfter}${parsed.search}${parsed.hash}`;
    }
  } catch {
    // Treat as relative URL
  }

  if (trimmedUrl.startsWith("/")) {
    if (trimmedUrl.startsWith("/wp-content/") || trimmedUrl.startsWith("/wp-includes/")) {
      return `${wpOrigin}${trimmedUrl}`;
    }
    return trimmedUrl;
  }

  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return `${wpOrigin}/${trimmedUrl.replace(/^\/+/, "")}`;
  }

  try {
    const parsed = new URL(trimmedUrl);
    const normalizedWpOrigin = new URL(wpOrigin);
    if (parsed.host === normalizedWpOrigin.host) {
      return trimmedUrl;
    }
  } catch {
    return trimmedUrl;
  }

  return trimmedUrl;
}

function rewriteHtmlMediaPaths(html: string, wpOrigin: string): string {
  if (!html) return "";
  let rewritten = html;
  // Replace absolute WordPress uploads or wp-content references to wpOrigin/wp-content
  rewritten = rewritten.replace(/https?:\/\/[^\s"'()>]+\/wp-content\//gi, `${wpOrigin}/wp-content/`);
  // Replace relative /wp-content/ references
  rewritten = rewritten.replace(/\/wp-content\//gi, `${wpOrigin}/wp-content/`);
  return rewritten;
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

function normalizeHomepageData(payload: Partial<HomepageCmsData> | null | undefined, wpOrigin: string): HomepageCmsData {
  const safePayload = payload ?? {};
  
  let heroTitle = safePayload.hero?.title ? sanitizeText(safePayload.hero.title) : "";
  if (!heroTitle || heroTitle === "WordPress Website" || heroTitle === "WordPress Site" || heroTitle.toLowerCase().includes("wordpress")) {
    heroTitle = "Chhetrapal Secondary School";
  }
  let heroEyebrow = safePayload.hero?.eyebrow ? sanitizeText(safePayload.hero.eyebrow) : "";
  if (!heroEyebrow || heroEyebrow === "WordPress Website" || heroEyebrow === "WordPress Site" || heroEyebrow.toLowerCase().includes("wordpress")) {
    heroEyebrow = "Chhetrapal Secondary School";
  }

  return {
    hero: {
      title: heroTitle,
      eyebrow: heroEyebrow,
      subtitle: safePayload.hero?.subtitle ? sanitizeText(safePayload.hero.subtitle) : "",
      description: safePayload.hero?.description ? sanitizeText(safePayload.hero.description) : "",
    },
    notices: (safePayload.notices ?? []).map((notice) => ({
      ...notice,
      title: sanitizeText(notice.title),
      summary: notice.summary ? sanitizeText(notice.summary) : undefined,
      content: notice.content ? rewriteHtmlMediaPaths(notice.content, wpOrigin) : undefined,
      link: normalizeCmsUrl(notice.link, wpOrigin),
      imageUrl: normalizeCmsUrl(notice.imageUrl, wpOrigin),
    })),
    principal: {
      name: safePayload.principal?.name ? sanitizeText(safePayload.principal.name) : "",
      title: safePayload.principal?.title ? sanitizeText(safePayload.principal.title) : "",
      message: safePayload.principal?.message ? sanitizeText(safePayload.principal.message) : "",
      photoUrl: safePayload.principal?.photoUrl ? normalizeCmsUrl(safePayload.principal.photoUrl, wpOrigin) : "",
      designation: safePayload.principal?.designation ? sanitizeText(safePayload.principal.designation) : "",
      link: safePayload.principal?.link ? normalizeCmsUrl(safePayload.principal.link, wpOrigin) : "",
    },
    programs: (safePayload.programs ?? []).map((program) => ({
      ...program,
      label: sanitizeText(program.label),
      desc: sanitizeText(program.desc),
      sub: sanitizeText(program.sub),
      imageUrl: normalizeCmsUrl(program.imageUrl, wpOrigin),
      link: normalizeCmsUrl(program.link, wpOrigin),
    })),
    facilities: (safePayload.facilities ?? []).map((facility) => ({
      ...facility,
      label: sanitizeText(facility.label),
      desc: sanitizeText(facility.desc),
      sub: sanitizeText(facility.sub),
      imageUrl: normalizeCmsUrl(facility.imageUrl, wpOrigin),
      link: normalizeCmsUrl(facility.link, wpOrigin),
    })),
    downloads: (safePayload.downloads ?? []).map((download) => ({
      ...download,
      title: sanitizeText(download.title),
      desc: sanitizeText(download.desc),
      buttonLabel: sanitizeText(download.buttonLabel),
      fileUrl: normalizeCmsUrl(download.fileUrl, wpOrigin),
      imageUrl: normalizeCmsUrl(download.imageUrl, wpOrigin),
    })),
    gallery: (safePayload.gallery ?? [])
      .filter((photo) => Boolean(photo.src))
      .map((photo) => ({
        ...photo,
        src: normalizeCmsUrl(photo.src, wpOrigin),
        alt: sanitizeText(photo.alt),
        title: sanitizeText(photo.title),
        link: normalizeCmsUrl(photo.link, wpOrigin),
      })),
    alumni: (safePayload.alumni ?? []).map((person) => ({
      ...person,
      name: sanitizeText(person.name),
      year: sanitizeText(person.year),
      achievement: sanitizeText(person.achievement),
      bio: person.bio ? rewriteHtmlMediaPaths(person.bio, wpOrigin) : "",
      photoUrl: normalizeCmsUrl(person.photoUrl, wpOrigin),
      link: normalizeCmsUrl(person.link, wpOrigin),
    })),
    scholarships: (safePayload.scholarships ?? []).map((winner) => ({
      ...winner,
      studentName: sanitizeText(winner.studentName),
      scholarshipTitle: sanitizeText(winner.scholarshipTitle),
      year: sanitizeText(winner.year),
      details: winner.details ? rewriteHtmlMediaPaths(winner.details, wpOrigin) : "",
      photoUrl: normalizeCmsUrl(winner.photoUrl, wpOrigin),
      link: normalizeCmsUrl(winner.link, wpOrigin),
    })),
    contact: {
      address: safePayload.contact?.address ? correctPlaceholder(sanitizeText(safePayload.contact.address), "address") : "",
      phone: safePayload.contact?.phone ? correctPlaceholder(sanitizeText(safePayload.contact.phone), "phone") : "",
      email: safePayload.contact?.email ? sanitizeText(safePayload.contact.email) : "",
      mapUrl: safePayload.contact?.mapUrl ? normalizeCmsUrl(safePayload.contact.mapUrl, wpOrigin) : "",
      facebookUrl: safePayload.contact?.facebookUrl ? normalizeCmsUrl(safePayload.contact.facebookUrl, wpOrigin) : "",
      youtubeUrl: safePayload.contact?.youtubeUrl ? normalizeCmsUrl(safePayload.contact.youtubeUrl, wpOrigin) : "",
      twitterUrl: safePayload.contact?.twitterUrl ? normalizeCmsUrl(safePayload.contact.twitterUrl, wpOrigin) : "",
      link: safePayload.contact?.link ? normalizeCmsUrl(safePayload.contact.link, wpOrigin) : "",
      privacyPolicy: safePayload.contact?.privacyPolicy ? sanitizeText(safePayload.contact.privacyPolicy) : undefined,
      emergencyAlert: safePayload.contact?.emergencyAlert ? sanitizeText(safePayload.contact.emergencyAlert) : undefined,
      feeStructure: safePayload.contact?.feeStructure ? sanitizeText(safePayload.contact.feeStructure) : undefined,
      scholarshipRules: safePayload.contact?.scholarshipRules ? sanitizeText(safePayload.contact.scholarshipRules) : undefined,
    },
    stats: (safePayload.stats ?? []).map((item) => ({
      value: sanitizeText(item.value),
      label: sanitizeText(item.label),
    })),
    routine: (safePayload.routine ?? []).map((item) => ({
      day: sanitizeText(item.day),
      p1: sanitizeText(item.p1),
      p2: sanitizeText(item.p2),
      p3: sanitizeText(item.p3),
      p4: sanitizeText(item.p4),
      p5: sanitizeText(item.p5),
    })),
    admissions: safePayload.admissions ? {
      status: safePayload.admissions.status === "closed" ? "closed" : "open",
      classes: sanitizeText(safePayload.admissions.classes),
      noticeUrl: normalizeCmsUrl(safePayload.admissions.noticeUrl, wpOrigin),
      title: sanitizeText(safePayload.admissions.title),
      content: sanitizeText(safePayload.admissions.content),
    } : undefined,
    marqueeNotices: (safePayload.marqueeNotices ?? []).map((notice) => sanitizeText(notice)),
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
      data: normalizeHomepageData(payload, wpOrigin),
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
        data: {
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
            facebookUrl: "#",
            youtubeUrl: "#",
            twitterUrl: "#",
          },
          stats: [
            { value: "1,200+", label: "Students" },
            { value: "55+", label: "Expert Staff" },
            { value: "98%", label: "Pass Rate" },
            { value: "35+", label: "Years Legacy" },
          ],
        },
      };
    } catch {
      return {
        sourceStatus: "local-fallback",
        data: {
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
            facebookUrl: "#",
            youtubeUrl: "#",
            twitterUrl: "#",
          },
          stats: [
            { value: "1,200+", label: "Students" },
            { value: "55+", label: "Expert Staff" },
            { value: "98%", label: "Pass Rate" },
            { value: "35+", label: "Years Legacy" },
          ],
        },
      };
    }
  }
}

export function shouldShowCmsStatusBadge(): boolean {
  return process.env.SHOW_CMS_STATUS_BADGE === "1" || process.env.SHOW_CMS_STATUS_BADGE === "true";
}
