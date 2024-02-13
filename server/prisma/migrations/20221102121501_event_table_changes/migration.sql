/*
  Warnings:

  - You are about to drop the `hosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pets` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[requestId]` on the table `event_schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noOfPetToHost` to the `event_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petType` to the `event_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestId` to the `event_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "hosts" DROP CONSTRAINT "hosts_hostId_fkey";

-- AlterTable
ALTER TABLE "event_schedule" ADD COLUMN     "noOfPetToHost" INTEGER NOT NULL,
ADD COLUMN     "petType" TEXT NOT NULL,
ADD COLUMN     "requestId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "hosts";

-- DropTable
DROP TABLE "pets";

-- CreateIndex
CREATE UNIQUE INDEX "event_schedule_requestId_key" ON "event_schedule"("requestId");

-- AddForeignKey
ALTER TABLE "event_schedule" ADD CONSTRAINT "event_schedule_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "request_booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
