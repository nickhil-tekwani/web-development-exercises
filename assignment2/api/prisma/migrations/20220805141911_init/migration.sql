/*
  Warnings:

  - Changed the type of `createdAt` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `createdAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
