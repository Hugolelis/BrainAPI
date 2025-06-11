/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `especialidades` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `especialidades_nome_key` ON `especialidades`(`nome`);
