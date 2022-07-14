-- CreateTable
CREATE TABLE "WatchedContent" (
    "user_id" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchedContent_pkey" PRIMARY KEY ("user_id","content_id")
);

-- AddForeignKey
ALTER TABLE "WatchedContent" ADD CONSTRAINT "WatchedContent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedContent" ADD CONSTRAINT "WatchedContent_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
