/*
  Warnings:

  - Added the required column `avatar_url` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatar_url" TEXT NOT NULL;
