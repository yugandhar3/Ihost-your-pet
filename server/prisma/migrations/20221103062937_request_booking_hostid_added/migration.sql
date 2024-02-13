/*
  Warnings:

  - Added the required column `hostId` to the `request_booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "request_booking" ADD COLUMN     "hostId" INTEGER NOT NULL;
