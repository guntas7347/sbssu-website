"use server";

import { db } from "@/db/drizzel";
import { placementRecords } from "@/db/schema";
import fs from "node:fs/promises";
import path from "node:path";

export async function importPlacementRecords() {
  const filePath = path.join(process.cwd(), "data/backups/placements.json");

  const records = JSON.parse(await fs.readFile(filePath, "utf8"));

  if (!Array.isArray(records)) {
    throw new Error("Invalid JSON: expected an array");
  }

  const mappedRecords = records.map((record) => ({
    sr: record["Sr"] || null,
    month: record["Month"] || null,
    passingYear: record["Passing Year"]
      ? parseInt(record["Passing Year"], 10)
      : null,
    studentName: record["Name of Student"] || null,
    course: record["Course"] || null,
    branch: record["Branch"] || null,
    packageLpa: record["Package (in LPA)"] || null,
    jobTitle: record["Job Title"] || null,
    companyName: record["Company Name"] || null,
  }));

  const failedRecords: {
    sr: string;
    student: string;
    error: string;
  }[] = [];

  let imported = 0;

  const chunkSize = 100;

  await db.delete(placementRecords);
  for (let i = 0; i < mappedRecords.length; i += chunkSize) {
    const chunk = mappedRecords.slice(i, i + chunkSize);

    try {
      await db.insert(placementRecords).values(chunk);
      imported += chunk.length;
    } catch {
      // Retry individually to identify failed records.
      for (const record of chunk) {
        try {
          await db.insert(placementRecords).values(record);
          imported++;
        } catch (error) {
          failedRecords.push({
            sr: record.sr ?? "",
            student: record.studentName ?? "",
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }
    }
  }

  return {
    success: failedRecords.length === 0,
    total: mappedRecords.length,
    imported,
    failed: failedRecords.length,
    failedRecords,
  };
}
