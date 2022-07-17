-- DropForeignKey
ALTER TABLE "WatchedContent" DROP CONSTRAINT "WatchedContent_content_id_fkey";

-- AddForeignKey
ALTER TABLE "WatchedContent" ADD CONSTRAINT "WatchedContent_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
