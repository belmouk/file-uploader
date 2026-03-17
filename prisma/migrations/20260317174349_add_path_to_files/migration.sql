/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "files_path_key" ON "files"("path");
