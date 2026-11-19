import postgres from "postgres";
import fs from "node:fs";

const sql = postgres(process.env.DATABASE_URL);

const records = JSON.parse(
  fs.readFileSync("./data/backups/placements.json", "utf8"),
);

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

const chunkSize = 500;
const failedRecords = [];

try {
  for (let i = 0; i < mappedRecords.length; i += chunkSize) {
    const chunk = mappedRecords.slice(i, i + chunkSize);

    try {
      await sql`
        INSERT INTO placement_records ${sql(chunk)}
      `;

      console.log(
        `Imported ${Math.min(i + chunk.length, mappedRecords.length)}/${mappedRecords.length}`,
      );
    } catch (batchError) {
      console.error(`Batch failed. Checking individual records...`);

      for (const record of chunk) {
        try {
          await sql`
            INSERT INTO placement_records ${sql(record)}
          `;
        } catch (error) {
          failedRecords.push({
            sr: record.sr,
            student: record.studentName,
            error: error.message,
            code: error.code,
          });

          console.error(
            `FAILED | Sr: ${record.sr} | Student: ${record.studentName} | ${error.message}`,
          );
        }
      }
    }
  }

  console.log("\n========== IMPORT SUMMARY ==========");
  console.log(`Total records: ${mappedRecords.length}`);
  console.log(`Failed records: ${failedRecords.length}`);
  console.log(
    `Successful records: ${mappedRecords.length - failedRecords.length}`,
  );

  if (failedRecords.length) {
    console.log("\nFailed Sr Numbers:");
    console.table(failedRecords);

    fs.writeFileSync(
      "./failed-placements.json",
      JSON.stringify(failedRecords, null, 2),
    );

    console.log("Failed records saved to failed-placements.json");
  }
} catch (error) {
  console.error("Import error:", error);
  process.exitCode = 1;
} finally {
  await sql.end();
}
