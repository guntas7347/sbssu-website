const BLOCKED_TAGS = new Set([
  "SCRIPT",
  "IFRAME",
  "OBJECT",
  "EMBED",
  "LINK",
  "META",
  "BASE",
  "FORM",
  "NOSCRIPT",
]);

const URL_ATTRS = new Set(["HREF", "SRC", "ACTION", "FORMACTION", "DATA"]);

function isUnsafeUrl(value: string): boolean {
  const normalized = value
    .replace(/[\u0000-\u001F\u007F\s]+/g, "")
    .toLowerCase();
  return (
    normalized.startsWith("javascript:") ||
    normalized.startsWith("vbscript:") ||
    normalized.startsWith("data:text/html")
  );
}

export function sanitizeHtmlClient(rawHtml: string): string {
  if (!rawHtml) return "";

  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");

  const walk = (node: Node) => {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        const tagName = el.tagName.toUpperCase();

        if (BLOCKED_TAGS.has(tagName)) {
          el.remove();
          continue;
        }

        for (const attr of Array.from(el.attributes)) {
          const attrName = attr.name.toUpperCase();
          if (attrName.startsWith("ON")) {
            el.removeAttribute(attr.name);
            continue;
          }
          if (URL_ATTRS.has(attrName) && isUnsafeUrl(attr.value)) {
            el.removeAttribute(attr.name);
          }
        }

        walk(el);
      } else if (child.nodeType === Node.COMMENT_NODE) {
        child.remove();
      }
    }
  };

  walk(doc.body);
  return doc.body.innerHTML;
}
