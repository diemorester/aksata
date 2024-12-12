-- AlterTable
ALTER TABLE `user` ADD COLUMN `changeEmailExpired` DATETIME(3) NULL,
    ADD COLUMN `changePasswordExpired` DATETIME(3) NULL;
