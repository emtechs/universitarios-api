-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'RECEIVED';

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "analysed_at" DOUBLE PRECISION NOT NULL DEFAULT 0;
