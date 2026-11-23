export type AdminHelpCategoryType = (typeof AdminHelpCategory)[number];

export type AdminHelpItemCategory = Exclude<AdminHelpCategoryType, "All">;

export interface AdminHelpItem {
  id: string;
  category: AdminHelpItemCategory;
  question: string;
  summary: string;
  steps?: string[];
  tags: string[];
}

export const AdminHelpCategory = [
  "All",
  "Page Entries & Fields",
  "Custom HTML Pages",
  "Ordering & Scopes",
] as const;

export const ADMIN_HELP_ITEMS: AdminHelpItem[] = [
  {
    id: "add-edit-department-data",
    category: "Page Entries & Fields",
    question: "How do I add or edit department data?",
    summary:
      "Go to Page Entries -> New Entry, pick your department category, fill field1 to field5 using the guide shown on screen, and save. If a category only allows one entry and already has one, a warning box appears with a link to edit the existing entry instead of creating a duplicate.",
    steps: [
      "Open Page Entries from the admin menu and click New Entry.",
      "Select your department category (such as About, Vision, Mission, HOD Details, Courses, Faculty, BoS, or Research).",
      "If a warning message shows up saying a single entry already exists, click the link in that warning to edit the existing one instead.",
      "Enter your details into field1 through field5 (and upload files, add links, or enable custom HTML if needed) following the field guide.",
      "Click Create Entry to publish, or open an existing row and click Edit to update it later.",
    ],
    tags: [
      "department",
      "hod",
      "add",
      "edit",
      "new entry",
      "page entries",
      "single entry",
      "warning",
      "field1",
      "guide",
    ],
  },
  {
    id: "department-category-codes",
    category: "Page Entries & Fields",
    question: "What do department category codes 205–213 expect in each field?",
    summary:
      "Department pages map specific category codes to dedicated sections: 205 About, 206 Vision, 207 Mission, 208 HOD Details, 209 Courses, 210 PEOs/POs/PSOs, 211 Faculty, 212 Board of Studies, and 213 Research/Grants.",
    steps: [
      "For 208 (HOD Details), put HOD Name in field1 and upload the portrait in file1.",
      "For 209 (Courses) and 211 (Faculty), put the program or faculty name in field1 and structured details in field2–field5.",
      "Use the category's note hint in the editor as a quick reminder while filling fields.",
    ],
    tags: [
      "205",
      "208",
      "209",
      "211",
      "department",
      "hod",
      "faculty",
      "courses",
    ],
  },
  {
    id: "custom-html-storage",
    category: "Custom HTML Pages",
    question: "Where is custom HTML stored and how is it rendered?",
    summary:
      "Custom HTML is sanitized and stored directly in htmlContent in the database alongside a normalized slug—no external HTML file path is needed.",
    steps: [
      "Check 'Make this a Custom HTML Page' in the editor.",
      "Enter a clean slug (for example, nba-sar-2026) and paste your HTML markup.",
      "Check the sanitized live preview before creating or saving the entry.",
    ],
    tags: ["html", "htmlContent", "slug", "custom page", "sanitize", "preview"],
  },
  {
    id: "reorder-entries",
    category: "Ordering & Scopes",
    question: "How do I change the display order of entries on public pages?",
    summary:
      "Public category and department views sort entries by displayOrder ascending. You can adjust order in one batch from the dedicated reorder screen.",
    steps: [
      "Open /admin/page-entries/order from the admin portal.",
      "Select the target category (and department group if applicable).",
      "Use the up/down controls or type displayOrder numbers directly, then click Save Order.",
    ],
    tags: ["displayOrder", "order", "sort", "reorder", "up", "down"],
  },
  {
    id: "scopes-and-hod-access",
    category: "Ordering & Scopes",
    question: "Why do I only see certain categories or department entries?",
    summary:
      "Available scopes and entries depend on your assigned portal rights and department scope. HODs and scoped editors only see categories and entries permitted for their allowed scopes or department.",
    steps: [
      "Check the scope filter pills in the Page Entries table if you have access to multiple scopes.",
      "If a category or entry is missing, verify your user rights and department assignment with a portal administrator.",
    ],
    tags: ["scope", "hod", "admin", "permissions", "rights", "department"],
  },
];
