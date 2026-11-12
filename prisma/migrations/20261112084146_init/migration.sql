-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "Medicine" (
    "id" UUID NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "strength" TEXT,
    "manufacturer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" UUID NOT NULL,
    "medicineId" UUID NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "expiryDate" DATE NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" UUID NOT NULL,
    "batchId" UUID NOT NULL,
    "type" "MovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reference" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_sku_key" ON "Medicine"("sku");

-- CreateIndex
CREATE INDEX "Batch_expiryDate_idx" ON "Batch"("expiryDate");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_medicineId_batchNumber_key" ON "Batch"("medicineId", "batchNumber");

-- CreateIndex
CREATE INDEX "StockMovement_batchId_createdAt_idx" ON "StockMovement"("batchId", "createdAt");

-- CreateIndex
CREATE INDEX "StockMovement_type_createdAt_idx" ON "StockMovement"("type", "createdAt");

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
