-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastOnline` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
