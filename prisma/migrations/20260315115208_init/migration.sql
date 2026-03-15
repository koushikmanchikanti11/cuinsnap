-- CreateTable
CREATE TABLE "Snap" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tag" VARCHAR(60),
    "comment" VARCHAR(150),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Snap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Snap_createdAt_idx" ON "Snap"("createdAt" DESC);
