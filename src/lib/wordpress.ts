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
  tag: "Notice" | "Event" | "Result";
  link?: string;
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

export type CmsContact = {
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  link?: string;
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
  contact: CmsContact;
  stats: Array<{ value: string; label: string }>;
};

const DEFAULT_WP_API_BASE = "/wp-json/wp/v2";
const DEFAULT_HOMEBASE = "/wp-json/chhetrapal/v1/homepage";
const DEFAULT_WP_ORIGIN = "http://127.0.0.1:9400";
const DEFAULT_TIMEOUT_MS = 5000;

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

function normalizeCmsUrl(url: string | undefined, wpOrigin: string): string {
  if (!url) {
    return "";
  }

  if (url.startsWith("/")) {
    return url;
  }

  if (!/^https?:\/\//i.test(url)) {
    return `/${url.replace(/^\/+/, "")}`;
  }

  try {
    const parsed = new URL(url);
    const normalizedWpOrigin = new URL(wpOrigin);

    if (parsed.host === normalizedWpOrigin.host) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return url;
  }

  return url;
}

function sanitizeText(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function normalizeHomepageData(payload: HomepageCmsData, wpOrigin: string): HomepageCmsData {
  return {
    ...payload,
    notices: payload.notices.map((notice) => ({
      ...notice,
      title: sanitizeText(notice.title),
      summary: notice.summary ? sanitizeText(notice.summary) : undefined,
      link: normalizeCmsUrl(notice.link, wpOrigin),
    })),
    principal: {
      ...payload.principal,
      name: sanitizeText(payload.principal.name),
      title: sanitizeText(payload.principal.title),
      designation: sanitizeText(payload.principal.designation),
      photoUrl: normalizeCmsUrl(payload.principal.photoUrl, wpOrigin),
      link: normalizeCmsUrl(payload.principal.link, wpOrigin),
    },
    programs: payload.programs.map((program) => ({
      ...program,
      label: sanitizeText(program.label),
      desc: sanitizeText(program.desc),
      sub: sanitizeText(program.sub),
      imageUrl: normalizeCmsUrl(program.imageUrl, wpOrigin),
      link: normalizeCmsUrl(program.link, wpOrigin),
    })),
    facilities: payload.facilities.map((facility) => ({
      ...facility,
      label: sanitizeText(facility.label),
      desc: sanitizeText(facility.desc),
      sub: sanitizeText(facility.sub),
      imageUrl: normalizeCmsUrl(facility.imageUrl, wpOrigin),
      link: normalizeCmsUrl(facility.link, wpOrigin),
    })),
    downloads: payload.downloads.map((download) => ({
      ...download,
      title: sanitizeText(download.title),
      desc: sanitizeText(download.desc),
      buttonLabel: sanitizeText(download.buttonLabel),
      fileUrl: normalizeCmsUrl(download.fileUrl, wpOrigin),
      imageUrl: normalizeCmsUrl(download.imageUrl, wpOrigin),
    })),
    gallery: payload.gallery
      .filter((photo) => Boolean(photo.src))
      .map((photo) => ({
        ...photo,
        src: normalizeCmsUrl(photo.src, wpOrigin),
        alt: sanitizeText(photo.alt),
        title: sanitizeText(photo.title),
        link: normalizeCmsUrl(photo.link, wpOrigin),
      })),
    contact: {
      ...payload.contact,
      address: sanitizeText(payload.contact.address),
      phone: sanitizeText(payload.contact.phone),
      email: sanitizeText(payload.contact.email),
      mapUrl: normalizeCmsUrl(payload.contact.mapUrl, wpOrigin),
      facebookUrl: normalizeCmsUrl(payload.contact.facebookUrl, wpOrigin),
      youtubeUrl: normalizeCmsUrl(payload.contact.youtubeUrl, wpOrigin),
      twitterUrl: normalizeCmsUrl(payload.contact.twitterUrl, wpOrigin),
      link: normalizeCmsUrl(payload.contact.link, wpOrigin),
    },
    stats: payload.stats.map((item) => ({
      value: sanitizeText(item.value),
      label: sanitizeText(item.label),
    })),
  };
}

async function fetchJson<T>(url: string, timeoutMs = 4000): Promise<T> {
  let attemptError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        cache: "no-store",
        signal: controller.signal,
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

export async function getHomepageCmsData(): Promise<HomepageCmsData | null> {
  const response = await getHomepageCmsDataWithStatus();
  return response?.data ?? null;
}

export async function getHomepageCmsDataWithStatus(): Promise<HomepageCmsResponse | null> {
  const wpOrigin = getWordPressOrigin();
  const base = toAbsoluteUrl(process.env.NEXT_PUBLIC_WORDPRESS_API_BASE || DEFAULT_WP_API_BASE, wpOrigin);
  const homepageUrl = toAbsoluteUrl(process.env.NEXT_PUBLIC_WORDPRESS_HOMEPAGE_API || DEFAULT_HOMEBASE, wpOrigin);

  try {
    const payload = await fetchJson<HomepageCmsData>(homepageUrl, DEFAULT_TIMEOUT_MS);
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
          subtitle: "CMS fallback mode",
          description: "WordPress is temporarily unavailable, so the local fallback content is being shown.",
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
          message: "Please publish the principal message from WordPress.",
          photoUrl: "",
          designation: "Principal",
        },
        programs: [],
        facilities: [],
        downloads: [],
        gallery: [],
        contact: {
          address: "Chhetrapal, Nuwakot, Bagmati Province, Nepal",
          phone: "+977-10-XXXXXXXX",
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
            description: "Both CMS endpoint and WordPress fallback are unavailable, so bundled local fallback content is shown.",
          },
          notices: [],
          principal: {
            name: "Principal",
            title: "Principal",
            message: "Please publish the principal message from WordPress.",
            photoUrl: "",
            designation: "Principal",
          },
          programs: [],
          facilities: [],
          downloads: [],
          gallery: [],
          contact: {
            address: "Chhetrapal, Nuwakot, Bagmati Province, Nepal",
            phone: "+977-10-XXXXXXXX",
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
