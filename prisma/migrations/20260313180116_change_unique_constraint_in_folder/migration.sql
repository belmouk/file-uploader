/*
  Warnings:

  - A unique constraint covering the columns `[path,name]` on the table `folders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "folders_path_key";

-- CreateIndex
CREATE UNIQUE INDEX "folders_path_name_key" ON "folders"("path", "name");
