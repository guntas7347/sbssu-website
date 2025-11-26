/*
  Warnings:

  - You are about to drop the column `key` on the `Page` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Page_key_key";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "key";
