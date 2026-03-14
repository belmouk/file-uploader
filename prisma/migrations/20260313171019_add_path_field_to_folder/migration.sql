/*
  Warnings:

  - Added the required column `path` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "path" TEXT NOT NULL;
