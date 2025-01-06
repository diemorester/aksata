/*
  Warnings:

  - The values [Terlambat] on the enum `Absensi_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `absensi` MODIFY `status` ENUM('Hadir', 'Sakit', 'Cuti', 'Izin', 'Alpha') NULL;
