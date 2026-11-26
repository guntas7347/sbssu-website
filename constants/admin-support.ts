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
      "Go to Manage Data (Page Entries) -> New Entry, pick your department category, fill field1 to field5 using the guide shown on screen, and save. If a category only allows one entry and already has one, a warning box appears with a link to edit the existing entry instead of creating a duplicate.",
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
    id: "create-page",
    category: "Page Entries & Fields",
    question: "What is Create Page?",
    summary:
      "Create Page is used to create a new page on the website. You choose what kind of information the page will contain and how that information will be displayed.",
    steps: [
      "Open Create Page to create a new page.",
      "Enter the page name and other basic details.",
      "Choose how the information should be displayed, such as a list, table, cards, accordion, or article.",
      "Set labels for the information you want to collect, such as Title, Description, Date, or Document.",
      "Save the page. It will now be available for adding information through Manage Data.",
      "Some pages are permanent and cannot be edited or deleted. These pages are maintained by the system.",
    ],
    tags: ["create page", "new page", "page setup", "page layout"],
  },
  {
    id: "manage-page-data",
    category: "Page Entries & Fields",
    question: "What is Manage Data?",
    summary:
      "Manage Data is used to add, update, arrange, and manage the information shown on an existing page. You do not create a new page here; you only manage its content.",
    steps: [
      "Open Manage Data and select a page you have access to.",
      "Click Add Entry to add new information to that page.",
      "Fill in the available fields. Their names depend on how the page was created.",
      "Upload documents or add links if those options are available.",
      "Save the entry to make the information available on the page.",
      "You can edit, delete, or change the display order of entries depending on your permissions.",
    ],
    tags: [
      "manage data",
      "page entries",
      "add information",
      "edit content",
      "upload documents",
    ],
  },
  {
    id: "create-page-vs-manage-data",
    category: "Page Entries & Fields",
    question: "What is the difference between Create Page and Manage Data?",
    summary:
      "Create Page creates the page itself, while Manage Data adds the information that appears inside that page.",
    steps: [
      "Use Create Page when you want to create a completely new page.",
      "Use Manage Data when you want to add information to an existing page.",
      "For example, create a page called Faculty Members using Create Page.",
      "Then use Manage Data to add individual faculty members, including their names, designations, photos, and other details.",
      "You only need to create the page once. You can add multiple entries to it whenever required.",
    ],
    tags: [
      "difference",
      "create page",
      "manage data",
      "page content",
      "entries",
    ],
  },
  {
    id: "page-access-permissions",
    category: "Page Entries & Fields",
    question: "Why can't I see or edit some pages?",
    summary:
      "You can only access and manage pages that are assigned to you according to your permissions. Some pages are maintained by the university or system administrators.",
    steps: [
      "Your available pages depend on your assigned access rights.",
      "Some pages are available to the entire university, while others belong to a particular department or section.",
      "You may be allowed to manage information on a page without having permission to change the page itself.",
      "Permanent pages cannot be modified or deleted through normal page management.",
      "Contact your administrator if you need access to a page or permission to make changes.",
    ],
    tags: [
      "permissions",
      "access",
      "page access",
      "permanent pages",
      "department",
    ],
  },
  {
    id: "page-entries",
    category: "Page Entries & Fields",
    question: "What is a Page Entry?",
    summary:
      "A Page Entry is one individual piece of information added to a page. A page can contain one or many entries, depending on its purpose.",
    steps: [
      "First, select the required page in Manage Data.",
      "Click Add Entry to create a new entry.",
      "Fill in the details shown in the form.",
      "Each entry can contain text, documents, and links, depending on the page settings.",
      "Save the entry. It will appear on the corresponding website page.",
      "For example, a Faculty Members page can have a separate entry for every faculty member.",
    ],
    tags: ["page entry", "add entry", "information", "content", "records"],
  },
  {
    id: "single-entry-page",
    category: "Page Entries & Fields",
    question: "Why can I add only one entry to a page?",
    summary:
      "Some pages are designed to contain only one entry. These pages are intended for information that does not need multiple separate records.",
    steps: [
      "A page may be configured to allow only one entry.",
      "For example, an About Us page may need only one entry.",
      "Other pages, such as Faculty Members or Notices, can contain multiple entries.",
      "If a page already has its single entry, you may need to edit that entry instead of adding another one.",
    ],
    tags: ["single entry", "one entry", "add entry", "page settings"],
  },
  {
    id: "page-display-order",
    category: "Ordering & Scopes",
    question: "How can I change the order of information on a page?",
    summary:
      "You can control the order in which information appears on a page using the display order option.",
    steps: [
      "Open Manage Data and select the required page.",
      "Find the entry whose position you want to change.",
      "Update its display order.",
      "Entries with smaller display order numbers appear before entries with larger numbers.",
      "Save your changes to update the order on the website.",
    ],
    tags: ["display order", "sorting", "arrange entries", "ordering"],
  },
  {
    id: "page-fields",
    category: "Page Entries & Fields",
    question: "Why are the form fields different on different pages?",
    summary:
      "Each page is designed to collect different types of information. The form fields are based on the requirements of that particular page.",
    steps: [
      "A Faculty Members page may ask for a name, designation, department, and profile link.",
      "A Notices page may ask for a notice title, date, document, and related link.",
      "A page administrator decides which information fields are needed when creating the page.",
      "Fill in the available fields according to their labels and instructions.",
      "If a field is unclear, check the guidance provided on the page or contact your administrator.",
    ],
    tags: ["fields", "form", "labels", "field names", "page information"],
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
