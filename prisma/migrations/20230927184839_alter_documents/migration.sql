-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "justification" VARCHAR(200),
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
