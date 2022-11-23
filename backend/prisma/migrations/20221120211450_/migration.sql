/*
  Warnings:

  - You are about to alter the column `dt_arrival` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_modification` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_record` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_output` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `birthdate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `dt_arrival` DATETIME NULL,
    MODIFY `dt_modification` DATETIME NULL,
    MODIFY `dt_record` DATETIME NULL,
    MODIFY `dt_output` DATETIME NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `birthdate` DATETIME NULL;
