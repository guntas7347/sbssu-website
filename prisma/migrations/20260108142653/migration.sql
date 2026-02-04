/*
  Warnings:

  - A unique constraint covering the columns `[slug,departmentId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Page_slug_key";

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "departmentId" TEXT;

-- CreateIndex
CREATE INDEX "Page_departmentId_idx" ON "Page"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_departmentId_key" ON "Page"("slug", "departmentId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
