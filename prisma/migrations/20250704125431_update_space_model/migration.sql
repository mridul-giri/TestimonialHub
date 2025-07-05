/*
  Warnings:

  - A unique constraint covering the columns `[spaceName]` on the table `Space` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spaceName` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Space` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "image" TEXT,
ADD COLUMN     "spaceName" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Space_spaceName_key" ON "Space"("spaceName");
