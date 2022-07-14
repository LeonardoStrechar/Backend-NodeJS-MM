/*
  Warnings:

  - Added the required column `creator_id` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
