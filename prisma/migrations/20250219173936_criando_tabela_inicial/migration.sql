-- CreateTable
CREATE TABLE "Voto" (
    "id" SERIAL NOT NULL,
    "candidato" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voto_pkey" PRIMARY KEY ("id")
);
