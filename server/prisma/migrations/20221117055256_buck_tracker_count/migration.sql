/*
  Warnings:

  - You are about to drop the column `buckTrackerCount` on the `event_schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event_schedule" DROP COLUMN "buckTrackerCount";

-- AlterTable
ALTER TABLE "request_booking" ADD COLUMN     "buckTrackerCount" INTEGER NOT NULL DEFAULT 0;
