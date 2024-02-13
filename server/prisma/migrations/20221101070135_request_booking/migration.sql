/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `hosts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestId` to the `hosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hosts" ADD COLUMN     "requestId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "request_booking" (
    "id" SERIAL NOT NULL,
    "noOfPetToHost" INTEGER NOT NULL,
    "r_start_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "r_end_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "request_booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hosts_requestId_key" ON "hosts"("requestId");

-- AddForeignKey
ALTER TABLE "hosts" ADD CONSTRAINT "hosts_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "request_booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_booking" ADD CONSTRAINT "request_booking_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
