const DEPT_SCOPES = new Set(["all-departments", "department"]);

export function buildPageUrl(params: {
  html?: boolean;
  scope?: string | null;
  catCode?: string | null;
  slug?: string | null;
  deptCode?: string | null;
}): string | null {
  const scope = (params.scope ?? "university").trim().toLowerCase();
  const catCode = (params.catCode ?? "").trim().toLowerCase();
  const slug = params.html ? (params.slug ?? "").trim().toLowerCase() : null;

  if (!scope || !catCode) {
    return null;
  }

  if (params.html && !slug) {
    return null;
  }

  const baseSegments = DEPT_SCOPES.has(scope)
    ? (() => {
        const deptCode = (params.deptCode ?? "").trim().toLowerCase();
        if (!deptCode) return null;
        return [scope, deptCode, catCode];
      })()
    : [scope, catCode];

  if (!baseSegments) {
    return null;
  }

  if (params.html) {
    return `/html/${[...baseSegments, slug].join("/")}`;
  }

  return `/pages/${baseSegments.join("/")}`;
}
