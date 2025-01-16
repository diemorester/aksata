/*
  Warnings:

  - You are about to drop the `pengajuan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pengajuan` DROP FOREIGN KEY `Pengajuan_absensiId_fkey`;

-- DropForeignKey
ALTER TABLE `pengajuan` DROP FOREIGN KEY `Pengajuan_userId_fkey`;

-- DropTable
DROP TABLE `pengajuan`;

-- CreateTable
CREATE TABLE `PengajuanAbsensi` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('Approved', 'Waiting', 'Cancelled', 'Declined') NOT NULL DEFAULT 'Waiting',
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `absensiId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengajuanLembur` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `nominal` DOUBLE NULL,
    `tipeLembur` ENUM('LemburSatu', 'LemburDua', 'LemburTiga') NULL,
    `date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `statusPengajuanLembur` ENUM('Approved', 'Waiting', 'Cancelled', 'Declined') NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PengajuanAbsensi` ADD CONSTRAINT `PengajuanAbsensi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanAbsensi` ADD CONSTRAINT `PengajuanAbsensi_absensiId_fkey` FOREIGN KEY (`absensiId`) REFERENCES `Absensi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanLembur` ADD CONSTRAINT `PengajuanLembur_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
