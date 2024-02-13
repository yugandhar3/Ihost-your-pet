/*
  Warnings:

  - You are about to drop the column `petId` on the `member_pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "member_pets" DROP CONSTRAINT "member_pets_petId_fkey";

-- DropIndex
DROP INDEX "member_pets_petId_key";

-- AlterTable
ALTER TABLE "member_pets" DROP COLUMN "petId";
