/*
  Warnings:

  - You are about to drop the column `product_Id` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_product_Id_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "product_Id";
