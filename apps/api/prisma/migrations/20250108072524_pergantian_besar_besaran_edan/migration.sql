/*
  Warnings:

  - You are about to drop the column `endDatePengajuan` on the `absensi` table. All the data in the column will be lost.
  - You are about to drop the column `startDatePengajuan` on the `absensi` table. All the data in the column will be lost.
  - You are about to drop the column `client` on the `pengajuan` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `pengajuan` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `pengajuan` table. All the data in the column will be lost.
  - You are about to drop the column `keterangan` on the `pengajuan` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `pengajuan` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(3))`.
  - Added the required column `absensiId` to the `Pengajuan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `absensi` DROP COLUMN `endDatePengajuan`,
    DROP COLUMN `startDatePengajuan`;

-- AlterTable
ALTER TABLE `pengajuan` DROP COLUMN `client`,
    DROP COLUMN `company`,
    DROP COLUMN `date`,
    DROP COLUMN `keterangan`,
    ADD COLUMN `absensiId` VARCHAR(191) NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL,
    MODIFY `nominal` DOUBLE NULL,
    MODIFY `tipeLembur` ENUM('LemburSatu', 'LemburDua', 'LemburTiga') NULL,
    MODIFY `status` ENUM('Approved', 'Waiting', 'Cancelled', 'Declined') NOT NULL DEFAULT 'Waiting';

-- AddForeignKey
ALTER TABLE `Pengajuan` ADD CONSTRAINT `Pengajuan_absensiId_fkey` FOREIGN KEY (`absensiId`) REFERENCES `Absensi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
