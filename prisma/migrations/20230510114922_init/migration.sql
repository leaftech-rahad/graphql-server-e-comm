-- CreateEnum
CREATE TYPE "Area" AS ENUM ('savar', 'uttora', 'DEPZ');

-- CreateTable
CREATE TABLE "Product" (
    "product_Id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_category_Id" TEXT NOT NULL,
    "product_subCategory_Id" TEXT NOT NULL,
    "product_purchase_Id" TEXT NOT NULL,
    "product_manufacturing_date" TIMESTAMP(3) NOT NULL,
    "product_expiry_date" TIMESTAMP(3) NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_usges" TEXT NOT NULL,
    "product_weight" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_Id")
);

-- CreateTable
CREATE TABLE "Image" (
    "image_Id" TEXT NOT NULL,
    "product_Id" TEXT NOT NULL,
    "image_description" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_Id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customer_Id" TEXT NOT NULL,
    "customer_Name" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_email" TEXT,
    "customer_DOB" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_area" "Area" NOT NULL DEFAULT 'savar',
    "customer_registration_store_Id" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_Id")
);

-- CreateTable
CREATE TABLE "Store" (
    "store_Id" TEXT NOT NULL,
    "store_Name" TEXT NOT NULL,
    "store_Email" TEXT,
    "store_code" INTEGER NOT NULL,
    "store_area" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_Id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "product_purchase_Id" TEXT NOT NULL,
    "product_purchase_origin_Id" TEXT NOT NULL,
    "product_net_purchase_price" DOUBLE PRECISION NOT NULL,
    "product_price_per_pcs" DOUBLE PRECISION NOT NULL,
    "product_net_purchase_quantity" INTEGER NOT NULL,
    "product_purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_store_inventory_Id" TEXT NOT NULL,
    "product_in_stock" INTEGER NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("product_purchase_Id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "sale_Id" TEXT NOT NULL,
    "customer_Id" TEXT NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_Id" TEXT NOT NULL,
    "product_pcs" INTEGER NOT NULL,
    "sale_net_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("sale_Id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_Id" TEXT NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "supplier_email" TEXT NOT NULL,
    "supplier_phone" TEXT NOT NULL,
    "supplier_store_name" TEXT NOT NULL,
    "supplier_area" "Area" NOT NULL DEFAULT 'savar',

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_name_key" ON "Product"("product_name");

-- CreateIndex
CREATE INDEX "Product_product_name_product_Id_idx" ON "Product"("product_name", "product_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customer_phone_key" ON "Customer"("customer_phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customer_email_key" ON "Customer"("customer_email");

-- CreateIndex
CREATE INDEX "Customer_customer_phone_customer_email_idx" ON "Customer"("customer_phone", "customer_email");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_code_key" ON "Store"("store_code");

-- CreateIndex
CREATE INDEX "Store_store_code_idx" ON "Store"("store_code");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_product_Id_fkey" FOREIGN KEY ("product_Id") REFERENCES "Product"("product_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_customer_registration_store_Id_fkey" FOREIGN KEY ("customer_registration_store_Id") REFERENCES "Store"("store_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_product_purchase_origin_Id_fkey" FOREIGN KEY ("product_purchase_origin_Id") REFERENCES "Supplier"("supplier_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_product_store_inventory_Id_fkey" FOREIGN KEY ("product_store_inventory_Id") REFERENCES "Store"("store_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_customer_Id_fkey" FOREIGN KEY ("customer_Id") REFERENCES "Customer"("customer_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_product_Id_fkey" FOREIGN KEY ("product_Id") REFERENCES "Product"("product_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
