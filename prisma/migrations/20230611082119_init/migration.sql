-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_product_Id_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "product_Id" DROP NOT NULL,
ALTER COLUMN "image_description" DROP NOT NULL,
ALTER COLUMN "encoding" DROP NOT NULL,
ALTER COLUMN "filename" DROP NOT NULL,
ALTER COLUMN "mimetype" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_product_Id_fkey" FOREIGN KEY ("product_Id") REFERENCES "Product"("product_Id") ON DELETE SET NULL ON UPDATE CASCADE;
