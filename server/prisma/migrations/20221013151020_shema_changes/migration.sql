/*
  Warnings:

  - You are about to drop the column `end_Date` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `start_Date` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `hosts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hosts" DROP COLUMN "end_Date",
DROP COLUMN "start_Date",
DROP COLUMN "status",
ALTER COLUMN "petType" SET NOT NULL,
ALTER COLUMN "petType" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "host_schedule" (
    "id" SERIAL NOT NULL,
    "start_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT[],
    "hostId" INTEGER NOT NULL,

    CONSTRAINT "host_schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "host_schedule" ADD CONSTRAINT "host_schedule_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
