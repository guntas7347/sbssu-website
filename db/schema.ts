// src/db/schema.ts
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const departmentsTable = pgTable(
  "departments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    code: text("code").notNull(),
    createdBy: text("created_by"),
    hodId: text("hod_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    unique("departments_code_unique").on(table.code),
    unique("departments_hod_unique").on(table.hodId),
  ],
);

export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username"),
  fullName: text("full_name"),
  email: text("email"),
  phone: text("phone"),
  departmentId: text("department_id").references(() => departmentsTable.id, {
    onDelete: "set null",
  }),
  rights: text("rights").array(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const noticesTable = pgTable("notices", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description"),
  refNumber: text("ref_number"),
  level: text("level"),
  category: text("category"),
  file: text("file"),
  createdBy: text("created_by").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  departmentId: text("department_id").references(() => departmentsTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Notice = typeof noticesTable.$inferSelect;

// ==========================================
// 2. RELATIONS DEFINITION
// ==========================================

export const departmentsRelations = relations(
  departmentsTable,
  ({ one, many }) => ({
    creator: one(usersTable, {
      fields: [departmentsTable.createdBy],
      references: [usersTable.id],
      relationName: "DepartmentCreator",
    }),
    hod: one(usersTable, {
      fields: [departmentsTable.hodId],
      references: [usersTable.id],
      relationName: "DepartmentHOD",
    }),
    users: many(usersTable),
  }),
);

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  department: one(departmentsTable, {
    fields: [usersTable.departmentId],
    references: [departmentsTable.id],
  }),
  notices: many(noticesTable),
}));

export const noticesRelations = relations(noticesTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [noticesTable.createdBy],
    references: [usersTable.id],
  }),
}));

export const legacyWebsites = pgTable("BusinessDetail", {
  id: integer("id").primaryKey(),
  category: integer("category"),
  name: varchar("name", { length: 255 }),
  image: varchar("image", { length: 255 }),
  company: varchar("company", { length: 255 }),
  description: text("description"),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  country: varchar("country", { length: 255 }),
  contactNo: varchar("contactNo", { length: 255 }),
  email: varchar("email", { length: 255 }),
  webSite: varchar("webSite", { length: 255 }),
  advertisement: varchar("advertisement", { length: 255 }),
  video: varchar("video", { length: 255 }),
  type: boolean("type"),
  approve: boolean("approve"),
  deleted: boolean("deleted").notNull().default(false),
});

export type LegacyWebsite = typeof legacyWebsites.$inferSelect;
export type NewLegacyWebsite = typeof legacyWebsites.$inferInsert;

export const placementRecords = pgTable(
  "placement_records",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    sr: text("sr"),
    month: text("month"),
    passingYear: integer("passing_year"),
    studentName: text("student_name"),
    course: text("course"),
    branch: text("branch"),
    packageLpa: text("package_lpa"),
    jobTitle: text("job_title"),
    companyName: text("company_name"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("placement_passing_year_idx").on(table.passingYear),
    index("placement_branch_idx").on(table.branch),
  ],
);

export type PlacementRecord = typeof placementRecords.$inferSelect;
export type NewPlacementRecord = typeof placementRecords.$inferInsert;

export const galleryItems = pgTable(
  "gallery_items",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title"),
    desc: text("desc"),
    path: text("path").notNull(),
    category: text("category").notNull(),
    album: text("album").notNull(),
    departmentId: text("department_id").references(() => departmentsTable.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdBy: text("created_by").references(() => usersTable.id, {
      onDelete: "set null",
    }),
  },
  (table) => [
    index("gallery_dept_album_idx").on(table.departmentId, table.album),
    index("gallery_category_created_idx").on(table.category, table.createdAt),
    index("gallery_created_by_idx").on(table.createdBy),
  ],
);

export type GalleryItem = typeof galleryItems.$inferSelect;
export type NewGalleryItem = typeof galleryItems.$inferInsert;

export const pageCategories = pgTable(
  "page_categories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    code: text("code").notNull(),
    note: text("note"), // guidance on what to fill where
    permanent: boolean("permanent").default(false).notNull(),
    singleEntry: boolean("single_entry").default(false).notNull(),
    scope: text("scope").default("university").notNull(), // "university" | "department" | "academics" | "coe" ...
    departmentId: text("department_id"), // null = University Wide, non-null = Department
    uiLayout: text("ui_layout")
      .$type<"list" | "table" | "cards" | "accordion" | "article">()
      .notNull()
      .default("list"),
    field1Label: text("field1_label"),
    field2Label: text("field2_label"),
    field3Label: text("field3_label"),
    field4Label: text("field4_label"),
    field5Label: text("field5_label"),
    file1Label: text("file1_label"),
    file2Label: text("file2_label"),
    link1Label: text("link1_label"),
    link2Label: text("link2_label"),
    createdById: text("created_by_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("page_categories_department_idx").on(table.departmentId),
    uniqueIndex("page_categories_global_code_uidx")
      .on(table.code)
      .where(sql`${table.departmentId} IS NULL`),
    uniqueIndex("page_categories_dept_code_uidx")
      .on(table.departmentId, table.code)
      .where(sql`${table.departmentId} IS NOT NULL`),
  ],
);

export const pageEntries = pgTable(
  "page_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    pageCategoryId: text("page_category_id")
      .notNull()
      .references(() => pageCategories.id, { onDelete: "restrict" }),
    departmentId: text("department_id"),
    displayOrder: integer("display_order").default(0).notNull(),
    field1: text("field1"),
    field2: text("field2"),
    field3: text("field3"),
    field4: text("field4"),
    field5: text("field5"),
    file1: text("file1"),
    file2: text("file2"),
    link1: text("link1"),
    link2: text("link2"),
    slug: text("slug"),
    htmlPath: text("html_path"), // optional legacy/file fallback
    htmlContent: text("html_content"), // sanitized HTML stored in DB
    createdById: text("created_by_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("page_entries_category_order_idx").on(
      table.pageCategoryId,
      table.displayOrder,
      table.createdAt,
    ),
    index("page_entries_department_idx").on(table.departmentId),
    index("page_entries_slug_idx").on(table.slug),
  ],
);

export const pageCategoriesRelations = relations(
  pageCategories,
  ({ many }) => ({
    entries: many(pageEntries),
  }),
);

export const pageEntriesRelations = relations(pageEntries, ({ one }) => ({
  category: one(pageCategories, {
    fields: [pageEntries.pageCategoryId],
    references: [pageCategories.id],
  }),
}));

export type PageCategoryRow = typeof pageCategories.$inferSelect;
export type NewPageCategoryRow = typeof pageCategories.$inferInsert;
export type PageEntryRow = typeof pageEntries.$inferSelect;
export type NewPageEntryRow = typeof pageEntries.$inferInsert;
