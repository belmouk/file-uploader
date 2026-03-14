/*
  Warnings:

  - You are about to drop the column `path` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `folders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "folders_path_key";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "path";

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "path",
ADD COLUMN     "parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
