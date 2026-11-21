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
    srNo: integer("sr_no").notNull().default(1),
    title: text("title"),
    desc: text("desc"),
    path: text("path").notNull(),
    category: text("category").notNull(),
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
    index("gallery_category_sr_idx").on(table.category, table.srNo),
    index("gallery_created_by_idx").on(table.createdBy),
  ],
);

export type GalleryItem = typeof galleryItems.$inferSelect;
export type NewGalleryItem = typeof galleryItems.$inferInsert;

export const pageDetails = pgTable(
  "page_details",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    departmentId: text("department_id").references(() => departmentsTable.id, {
      onDelete: "cascade",
    }),
    category: text("category").notNull(),
    srNo: integer("sr_no").notNull().default(1),
    title: text("title").notNull(),
    desc: text("desc"),
    file: text("file"),
    link: text("link"),
    createdBy: text("created_by")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("page_details_dept_cat_sr_idx").on(
      table.departmentId,
      table.category,
      table.srNo,
    ),
    index("page_details_category_idx").on(table.category),
    index("page_details_created_by_idx").on(table.createdBy),
  ],
);

export type PageDetail = typeof pageDetails.$inferSelect;
export type NewPageDetail = typeof pageDetails.$inferInsert;

// for HTML based pages
export const customPages = pgTable(
  "custom_pages",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    path: text("path").notNull(),
    type: text("type").$type<"university" | "department">().notNull(),
    departmentId: text("department_id").references(() => departmentsTable.id, {
      onDelete: "cascade",
    }),
    createdBy: text("created_by")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    // Unique slug per department when departmentId is set
    uniqueIndex("custom_pages_dept_slug_uq")
      .on(table.departmentId, table.slug)
      .where(sql`${table.departmentId} is not null`),
    // Unique slug across university-wide pages when departmentId is null
    uniqueIndex("custom_pages_uni_slug_uq")
      .on(table.slug)
      .where(sql`${table.departmentId} is null`),
    index("custom_pages_type_idx").on(table.type),
    index("custom_pages_created_by_idx").on(table.createdBy),
  ],
);

export type CustomPage = typeof customPages.$inferSelect;
export type NewCustomPage = typeof customPages.$inferInsert;

export type PageEntryType = "custom" | "generic";
export type CustomPageScope = "university" | "department";

export const pageEntries = pgTable(
  "page_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    type: text("type").$type<PageEntryType>().notNull().default("generic"),

    // Scope & shared identity
    departmentId: text("department_id").references(() => departmentsTable.id, {
      onDelete: "cascade",
    }),
    title: text("title"),

    // Generic entry fields (type = "generic")
    category: text("category"),
    desc: text("desc"),
    file: text("file"),
    link: text("link"),

    // Custom HTML page fields (type = "custom")
    slug: text("slug"),
    path: text("path"),
    scope: text("scope").$type<CustomPageScope>(),

    createdBy: text("created_by")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    // Unique slug per department for custom pages
    uniqueIndex("page_entries_custom_dept_slug_uq")
      .on(table.departmentId, table.slug)
      .where(
        sql`${table.type} = 'custom' and ${table.departmentId} is not null`,
      ),
    // Unique slug across university-wide custom pages
    uniqueIndex("page_entries_custom_uni_slug_uq")
      .on(table.slug)
      .where(sql`${table.type} = 'custom' and ${table.departmentId} is null`),
    index("page_entries_type_idx").on(table.type),
    index("page_entries_dept_cat_created_idx").on(
      table.departmentId,
      table.category,
      table.createdAt,
    ),
    index("page_entries_created_by_idx").on(table.createdBy),
  ],
);

export type PageEntry = typeof pageEntries.$inferSelect;
export type NewPageEntry = typeof pageEntries.$inferInsert;
