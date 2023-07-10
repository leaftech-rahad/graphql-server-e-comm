-- CreateEnum
CREATE TYPE "Role" AS ENUM ('customer', 'admin', 'staff');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'customer';
