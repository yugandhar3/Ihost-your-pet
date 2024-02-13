/*
  Warnings:

  - You are about to drop the column `requestId` on the `event_schedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `request_booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `request_booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event_schedule" DROP CONSTRAINT "event_schedule_requestId_fkey";

-- DropIndex
DROP INDEX "event_schedule_requestId_key";

-- AlterTable
ALTER TABLE "event_schedule" DROP COLUMN "requestId";

-- AlterTable
ALTER TABLE "request_booking" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "request_booking_eventId_key" ON "request_booking"("eventId");

-- AddForeignKey
ALTER TABLE "request_booking" ADD CONSTRAINT "request_booking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
