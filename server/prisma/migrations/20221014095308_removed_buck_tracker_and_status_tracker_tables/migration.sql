/*
  Warnings:

  - You are about to drop the `buck_tracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status_tracker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buckTrackerCount` to the `event_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `event_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "buck_tracker" DROP CONSTRAINT "buck_tracker_memberId_fkey";

-- DropForeignKey
ALTER TABLE "status_tracker" DROP CONSTRAINT "status_tracker_statusId_fkey";

-- DropForeignKey
ALTER TABLE "status_tracker" DROP CONSTRAINT "status_tracker_trackerId_fkey";

-- AlterTable
ALTER TABLE "event_schedule" ADD COLUMN     "buckTrackerCount" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "buck_tracker";

-- DropTable
DROP TABLE "status_tracker";
