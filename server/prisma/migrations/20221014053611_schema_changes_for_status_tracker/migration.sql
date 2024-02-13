/*
  Warnings:

  - You are about to drop the column `trackerId` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the `host_schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "host_schedule" DROP CONSTRAINT "host_schedule_hostId_fkey";

-- DropForeignKey
ALTER TABLE "hosts" DROP CONSTRAINT "hosts_trackerId_fkey";

-- AlterTable
ALTER TABLE "hosts" DROP COLUMN "trackerId";

-- DropTable
DROP TABLE "host_schedule";

-- CreateTable
CREATE TABLE "event_schedule" (
    "id" SERIAL NOT NULL,
    "scheduleType" TEXT NOT NULL,
    "start_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "event_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_tracker" (
    "id" SERIAL NOT NULL,
    "status" TEXT[],
    "start_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trackerId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "status_tracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_tracker_statusId_key" ON "status_tracker"("statusId");

-- AddForeignKey
ALTER TABLE "event_schedule" ADD CONSTRAINT "event_schedule_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_tracker" ADD CONSTRAINT "status_tracker_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "buck_tracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_tracker" ADD CONSTRAINT "status_tracker_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "event_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
