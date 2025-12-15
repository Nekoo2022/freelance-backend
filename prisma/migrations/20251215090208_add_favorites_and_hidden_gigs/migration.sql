/*
  Warnings:

  - You are about to drop the `_HiddenGigs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HiddenGigs" DROP CONSTRAINT "_HiddenGigs_A_fkey";

-- DropForeignKey
ALTER TABLE "_HiddenGigs" DROP CONSTRAINT "_HiddenGigs_B_fkey";

-- DropTable
DROP TABLE "_HiddenGigs";

-- CreateTable
CREATE TABLE "hidden_gigs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hidden_gigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_gigs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_gigs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hidden_gigs_userId_gigId_key" ON "hidden_gigs"("userId", "gigId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_gigs_userId_gigId_key" ON "favorite_gigs"("userId", "gigId");

-- AddForeignKey
ALTER TABLE "hidden_gigs" ADD CONSTRAINT "hidden_gigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hidden_gigs" ADD CONSTRAINT "hidden_gigs_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_gigs" ADD CONSTRAINT "favorite_gigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_gigs" ADD CONSTRAINT "favorite_gigs_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
