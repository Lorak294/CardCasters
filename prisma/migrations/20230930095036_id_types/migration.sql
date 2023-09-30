-- AlterTable
ALTER TABLE "Deck" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Key" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
