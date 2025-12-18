/*
  Warnings:

  - Added the required column `requirements` to the `gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gigs" ADD COLUMN     "requirements" TEXT NOT NULL;
