-- DropForeignKey
ALTER TABLE "favorite_gigs" DROP CONSTRAINT "favorite_gigs_gigId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_gigs" DROP CONSTRAINT "favorite_gigs_userId_fkey";

-- DropForeignKey
ALTER TABLE "hidden_gigs" DROP CONSTRAINT "hidden_gigs_gigId_fkey";

-- DropForeignKey
ALTER TABLE "hidden_gigs" DROP CONSTRAINT "hidden_gigs_userId_fkey";

-- AddForeignKey
ALTER TABLE "hidden_gigs" ADD CONSTRAINT "hidden_gigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hidden_gigs" ADD CONSTRAINT "hidden_gigs_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_gigs" ADD CONSTRAINT "favorite_gigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_gigs" ADD CONSTRAINT "favorite_gigs_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
