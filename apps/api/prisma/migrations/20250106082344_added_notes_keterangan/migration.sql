-- AlterTable
ALTER TABLE `absensi` ADD COLUMN `endDatePengajuan` DATETIME(3) NULL,
    ADD COLUMN `keterangan` VARCHAR(191) NULL,
    ADD COLUMN `startDatePengajuan` DATETIME(3) NULL;
