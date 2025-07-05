/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Space_userId_title_key" ON "Space"("userId", "title");
