/*
  Warnings:

  - Added the required column `lastLogin` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "lastLogin" TIMESTAMP(3) NOT NULL;
