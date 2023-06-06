/*
  Warnings:

  - Added the required column `customer_password` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "customer_password" TEXT NOT NULL;
