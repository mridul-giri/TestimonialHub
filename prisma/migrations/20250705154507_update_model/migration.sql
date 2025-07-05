/*
  Warnings:

  - A unique constraint covering the columns `[spaceName,userId]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Space_spaceName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Space_spaceName_userId_key" ON "Space"("spaceName", "userId");
