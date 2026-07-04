import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML input from the WordPress CMS before rendering to the DOM.
 * Restricts rendering to a safe subset of tags and attributes to prevent XSS.
 */
export function sanitizeHtml(html: string | undefined): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "ol",
      "ul",
      "li",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
      "blockquote",
      "pre",
      "code",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "target",
      "rel",
      "style",
    ],
  });
}
