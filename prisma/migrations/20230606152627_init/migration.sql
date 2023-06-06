/*
  Warnings:

  - You are about to drop the column `customer_Name` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `customer_name` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "customer_Name",
ADD COLUMN     "customer_name" TEXT NOT NULL;
