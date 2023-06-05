/*
  Warnings:

  - You are about to drop the column `customer_registration_store_Id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `product_expiry_date` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_manufacturing_date` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_purchase_Id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_subCategory_Id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_purchase_origin_Id` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `product_store_inventory_Id` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `store_Email` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `store_Name` on the `Store` table. All the data in the column will be lost.
  - Added the required column `encoding` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyer_store_Id` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_expiry_date` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_manufacturing_date` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_moved_to_shelf` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchased_product_Id` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_Id` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canceled_order` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refunded_order` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_name` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `store_area` on the `Store` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PayMethod" AS ENUM ('Cash', 'Bkash', 'CreditCard');

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_customer_registration_store_Id_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_product_purchase_origin_Id_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_product_store_inventory_Id_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "customer_registration_store_Id",
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "encoding" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_expiry_date",
DROP COLUMN "product_manufacturing_date",
DROP COLUMN "product_purchase_Id",
DROP COLUMN "product_subCategory_Id",
ADD COLUMN     "product_brand_Id" TEXT,
ADD COLUMN     "product_subcategory_Id" TEXT,
ALTER COLUMN "product_category_Id" DROP NOT NULL,
ALTER COLUMN "product_description" DROP NOT NULL,
ALTER COLUMN "product_usges" DROP NOT NULL,
ALTER COLUMN "product_weight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "product_purchase_origin_Id",
DROP COLUMN "product_store_inventory_Id",
ADD COLUMN     "buyer_store_Id" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_expiry_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "product_manufacturing_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "product_moved_to_shelf" BOOLEAN NOT NULL,
ADD COLUMN     "purchased_product_Id" TEXT NOT NULL,
ADD COLUMN     "seller_Id" TEXT NOT NULL,
ADD COLUMN     "soldOut" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "canceled_order" BOOLEAN NOT NULL,
ADD COLUMN     "payed_with" "PayMethod" NOT NULL DEFAULT 'Cash',
ADD COLUMN     "refunded_order" BOOLEAN NOT NULL;

-- AlterTable
CREATE SEQUENCE store_store_code_seq;
ALTER TABLE "Store" DROP COLUMN "store_Email",
DROP COLUMN "store_Name",
ADD COLUMN     "store_email" TEXT,
ADD COLUMN     "store_name" TEXT NOT NULL,
ALTER COLUMN "store_code" SET DEFAULT nextval('store_store_code_seq'),
DROP COLUMN "store_area",
ADD COLUMN     "store_area" "Area" NOT NULL;
ALTER SEQUENCE store_store_code_seq OWNED BY "Store"."store_code";

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "supplier_email" DROP NOT NULL,
ALTER COLUMN "supplier_area" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Brand" (
    "brand_Id" TEXT NOT NULL,
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("brand_Id")
);

-- CreateTable
CREATE TABLE "Product_category" (
    "category_Id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_description" TEXT NOT NULL,

    CONSTRAINT "Product_category_pkey" PRIMARY KEY ("category_Id")
);

-- CreateTable
CREATE TABLE "Product_subcategory" (
    "subcategory_Id" TEXT NOT NULL,
    "subcategory_name" TEXT NOT NULL,
    "subcategory_description" TEXT NOT NULL,
    "product_category_Id" TEXT NOT NULL,

    CONSTRAINT "Product_subcategory_pkey" PRIMARY KEY ("subcategory_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brand_name_key" ON "Brand"("brand_name");

-- CreateIndex
CREATE INDEX "Brand_brand_name_idx" ON "Brand"("brand_name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_category_Id_fkey" FOREIGN KEY ("product_category_Id") REFERENCES "Product_category"("category_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_subcategory_Id_fkey" FOREIGN KEY ("product_subcategory_Id") REFERENCES "Product_subcategory"("subcategory_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_brand_Id_fkey" FOREIGN KEY ("product_brand_Id") REFERENCES "Brand"("brand_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_purchased_product_Id_fkey" FOREIGN KEY ("purchased_product_Id") REFERENCES "Product"("product_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_seller_Id_fkey" FOREIGN KEY ("seller_Id") REFERENCES "Supplier"("supplier_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_buyer_store_Id_fkey" FOREIGN KEY ("buyer_store_Id") REFERENCES "Store"("store_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_subcategory" ADD CONSTRAINT "Product_subcategory_product_category_Id_fkey" FOREIGN KEY ("product_category_Id") REFERENCES "Product_category"("category_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
