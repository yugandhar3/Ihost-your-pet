/*
  Warnings:

  - You are about to drop the column `hostId` on the `request_booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "request_booking" DROP CONSTRAINT "request_booking_hostId_fkey";

-- AlterTable
ALTER TABLE "request_booking" DROP COLUMN "hostId";
