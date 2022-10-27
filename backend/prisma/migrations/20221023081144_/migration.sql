-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `birthdate` DATETIME NULL,
    `firstName` VARCHAR(255) NULL,
    `lastName` VARCHAR(255) NULL,
    `cpf` VARCHAR(255) NULL,
    `phoneNumber` INTEGER NULL,
    `gender` VARCHAR(255) NULL,
    `DocumentType` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_paymentId_key`(`paymentId`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(255) NULL,
    `postalCode` VARCHAR(255) NULL,
    `complement` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `number` VARCHAR(255) NULL,
    `neighborhood` VARCHAR(255) NULL,
    `street` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Address_userId_key`(`userId`),
    INDEX `Address_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(255) NULL,
    `DocumentFrontUri` VARCHAR(255) NULL,
    `DocumentBackUri` VARCHAR(255) NULL,
    `DocumentSelfieUri` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Document_userId_key`(`userId`),
    INDEX `Document_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Boat` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(255) NULL,
    `IMO` INTEGER NULL,
    `name` VARCHAR(255) NULL,
    `subscription` INTEGER NULL,
    `flag` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Boat_userId_key`(`userId`),
    UNIQUE INDEX `Boat_IMO_key`(`IMO`),
    INDEX `Boat_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(255) NULL,
    `accommodation_name` VARCHAR(255) NULL,
    `destination_city` VARCHAR(255) NULL,
    `home_city` VARCHAR(255) NULL,
    `dt_arrival` DATETIME NULL,
    `dt_modification` DATETIME NULL,
    `dt_record` DATETIME NULL,
    `dt_output` DATETIME NULL,
    `boat_name` VARCHAR(255) NULL,
    `boat_phone` VARCHAR(255) NULL,
    `image_url` VARCHAR(255) NULL,
    `remaining_quantity` INTEGER NULL,
    `food_value` INTEGER NULL,
    `transport_value` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ticket_userId_key`(`userId`),
    INDEX `Ticket_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(255) NULL,
    `paymentId` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payment_ticketId_key`(`ticketId`),
    INDEX `Payment_userId_fkey`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boat` ADD CONSTRAINT `Boat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
