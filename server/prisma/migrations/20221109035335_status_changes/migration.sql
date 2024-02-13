/*
  Warnings:

  - You are about to drop the column `status` on the `event_schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event_schedule" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "request_booking" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';
