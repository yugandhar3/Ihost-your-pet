/*
  Warnings:

  - You are about to drop the column `requestId` on the `hosts` table. All the data in the column will be lost.
  - Added the required column `hostId` to the `request_booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petType` to the `request_booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "hosts" DROP CONSTRAINT "hosts_requestId_fkey";

-- AlterTable
ALTER TABLE "hosts" DROP COLUMN "requestId";

-- AlterTable
ALTER TABLE "request_booking" ADD COLUMN     "hostId" INTEGER NOT NULL,
ADD COLUMN     "petType" TEXT NOT NULL,
ALTER COLUMN "noOfPetToHost" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "request_booking" ADD CONSTRAINT "request_booking_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
