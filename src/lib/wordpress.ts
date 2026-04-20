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
  link?: string;
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

async function fetchJson<T>(url: string, timeoutMs = 4000): Promise<T> {
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
  } finally {
    clearTimeout(timeout);
  }
}

export async function getHomepageCmsData(): Promise<HomepageCmsData | null> {
  const wpOrigin = getWordPressOrigin();
  const base = toAbsoluteUrl(process.env.NEXT_PUBLIC_WORDPRESS_API_BASE || DEFAULT_WP_API_BASE, wpOrigin);
  const homepageUrl = toAbsoluteUrl(process.env.NEXT_PUBLIC_WORDPRESS_HOMEPAGE_API || DEFAULT_HOMEBASE, wpOrigin);

  try {
    return await fetchJson<HomepageCmsData>(homepageUrl);
  } catch {
    try {
      const posts = await fetchJson<Array<{ id: number; date: string; title: { rendered: string } }>>(
        `${base}/posts?per_page=6&_fields=id,date,title`
      );

      return {
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
        },
        stats: [
          { value: "1,200+", label: "Students" },
          { value: "55+", label: "Expert Staff" },
          { value: "98%", label: "Pass Rate" },
          { value: "35+", label: "Years Legacy" },
        ],
      };
    } catch {
      return null;
    }
  }
}
