/*
  Warnings:

  - Added the required column `PetAcceptingTime` to the `event_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_schedule" ADD COLUMN     "PetAcceptingTime" TEXT NOT NULL;
