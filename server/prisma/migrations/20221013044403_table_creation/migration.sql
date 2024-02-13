-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" INTEGER NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "petType" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_pets" (
    "id" SERIAL NOT NULL,
    "petType" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "vacination" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "member_pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hosts" (
    "id" SERIAL NOT NULL,
    "petType" TEXT[],
    "start_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT[],
    "noOfPetToHost" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,
    "trackerId" INTEGER NOT NULL,

    CONSTRAINT "hosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buck_tracker" (
    "id" SERIAL NOT NULL,
    "credit" INTEGER NOT NULL,
    "debit" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "buck_tracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_email_key" ON "member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "member_pets_petId_key" ON "member_pets"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "buck_tracker_memberId_key" ON "buck_tracker"("memberId");

-- AddForeignKey
ALTER TABLE "member_pets" ADD CONSTRAINT "member_pets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_pets" ADD CONSTRAINT "member_pets_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hosts" ADD CONSTRAINT "hosts_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hosts" ADD CONSTRAINT "hosts_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "buck_tracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buck_tracker" ADD CONSTRAINT "buck_tracker_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
