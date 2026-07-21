import { filterXSS } from "xss";

/**
 * Sanitizes HTML input from the WordPress CMS before rendering to the DOM.
 * Restricts rendering to a safe subset of tags and attributes to prevent XSS.
 */
export function sanitizeHtml(html: string | undefined): string {
  if (!html) return "";
  return filterXSS(html, {
    whiteList: {
      p: ["class", "style"],
      br: [],
      strong: [],
      em: [],
      u: [],
      ol: ["class", "style"],
      ul: ["class", "style"],
      li: ["class", "style"],
      a: ["href", "title", "target", "rel", "class", "style"],
      img: ["src", "alt", "title", "class", "style"],
      figure: ["class", "style"],
      figcaption: ["class", "style"],
      h1: ["class", "style"],
      h2: ["class", "style"],
      h3: ["class", "style"],
      h4: ["class", "style"],
      h5: ["class", "style"],
      h6: ["class", "style"],
      span: ["class", "style"],
      div: ["class", "style"],
      blockquote: ["class", "style"],
      pre: ["class", "style"],
      code: ["class", "style"],
    },
  });
}
