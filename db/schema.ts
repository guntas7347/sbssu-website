// src/db/schema.ts
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const departmentsTable = pgTable("departments", {
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
});

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
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

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
