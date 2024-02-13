/*
  Warnings:

  - You are about to drop the column `eventId` on the `request_booking` table. All the data in the column will be lost.
  - You are about to drop the `event_schedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `PetAcceptingTime` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noOfPetToHost` to the `member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petType` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event_schedule" DROP CONSTRAINT "event_schedule_memberId_fkey";

-- DropForeignKey
ALTER TABLE "request_booking" DROP CONSTRAINT "request_booking_eventId_fkey";

-- AlterTable
ALTER TABLE "member" ADD COLUMN     "PetAcceptingTime" TEXT NOT NULL,
ADD COLUMN     "noOfPetToHost" TEXT NOT NULL,
ADD COLUMN     "petType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "request_booking" DROP COLUMN "eventId",
ALTER COLUMN "r_start_Date" DROP DEFAULT,
ALTER COLUMN "r_end_Date" DROP DEFAULT;

-- DropTable
DROP TABLE "event_schedule";

-- CreateTable
CREATE TABLE "non_availabile_date" (
    "id" SERIAL NOT NULL,
    "start_Date" TIMESTAMP(3) NOT NULL,
    "end_Date" TIMESTAMP(3) NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "non_availabile_date_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "non_availabile_date" ADD CONSTRAINT "non_availabile_date_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
