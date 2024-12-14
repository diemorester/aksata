-- AlterTable
ALTER TABLE `absensi` MODIFY `clockIn` DATETIME(3) NULL,
    MODIFY `clockOut` DATETIME(3) NULL,
    MODIFY `status` ENUM('Hadir', 'Terlambat', 'Sakit', 'Cuti', 'Izin', 'Alpha') NULL;
