export const gallery_categories = ["central", "department"];

export const NOTICE_LEVELS = ["central", "department", "public"] as const;
export type NoticeLevel = (typeof NOTICE_LEVELS)[number];

export function getAllowedNoticeLevels(
  rights: readonly string[] | null | undefined,
): NoticeLevel[] {
  const userRights = rights ?? [];
  const hasAdmin = userRights.includes("admin");
  const hasHod = userRights.includes("hod");

  const allowed: NoticeLevel[] = [];

  if (hasAdmin) {
    allowed.push("central", "public");
  }

  if (hasHod) {
    allowed.push("department");
  }

  return allowed;
}
export const notice_categories = ["academic", "sports", "other"];
