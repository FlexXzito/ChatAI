/*
  Warnings:

  - You are about to drop the column `matedificulta` on the `educacion` table. All the data in the column will be lost.
  - You are about to drop the column `motivo` on the `educacion` table. All the data in the column will be lost.
  - You are about to drop the column `nivelescolaridad` on the `educacion` table. All the data in the column will be lost.
  - You are about to drop the column `nivelingles` on the `educacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipocolegio` on the `educacion` table. All the data in the column will be lost.
  - You are about to drop the column `disponibilidad` on the `informacion_usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefonoFamiliar` on the `informacion_usuario` table. All the data in the column will be lost.
  - You are about to drop the column `testActual` on the `informacion_usuario` table. All the data in the column will be lost.
  - You are about to drop the column `estrato` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `etnico` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `familiaresnum` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `localidad` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `personascargo` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `tipovivienda` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `vivienda` on the `informacionpersonal` table. All the data in the column will be lost.
  - You are about to drop the column `Internet` on the `salud` table. All the data in the column will be lost.
  - You are about to drop the column `alcohol` on the `salud` table. All the data in the column will be lost.
  - You are about to drop the column `discapacidad` on the `salud` table. All the data in the column will be lost.
  - You are about to drop the column `enfermecronica` on the `salud` table. All the data in the column will be lost.
  - You are about to drop the column `eps` on the `salud` table. All the data in the column will be lost.
  - You are about to drop the column `nicotina` on the `salud` table. All the data in the column will be lost.
  - You are about to drop the column `suspsicoactivas` on the `salud` table. All the data in the column will be lost.
  - You are about to drop the column `ascenso` on the `situacionlaboral` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `situacionlaboral` table. All the data in the column will be lost.
  - You are about to drop the `cita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `condicionesvivienda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consultorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ghq12` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historialagendamiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practicante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apoyos` to the `educacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jornada` to the `educacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relacionamiento` to the `educacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accesosalud` to the `salud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diagnostico` to the `salud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelestres` to the `salud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pensamientosuicidas` to the `salud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesonashogar` to the `situacionlaboral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `cita_idConsultorio_fkey`;

-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `cita_idPracticante_fkey`;

-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `cita_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `condicionesvivienda` DROP FOREIGN KEY `condicionesvivienda_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `ghq12` DROP FOREIGN KEY `ghq12_telefono_fkey`;

-- DropForeignKey
ALTER TABLE `historialagendamiento` DROP FOREIGN KEY `historialAgendamiento_numeroUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `tests` DROP FOREIGN KEY `tests_telefono_fkey`;

-- AlterTable
ALTER TABLE `educacion` DROP COLUMN `matedificulta`,
    DROP COLUMN `motivo`,
    DROP COLUMN `nivelescolaridad`,
    DROP COLUMN `nivelingles`,
    DROP COLUMN `tipocolegio`,
    ADD COLUMN `apoyos` VARCHAR(191) NOT NULL,
    ADD COLUMN `jornada` VARCHAR(191) NOT NULL,
    ADD COLUMN `relacionamiento` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `informacion_usuario` DROP COLUMN `disponibilidad`,
    DROP COLUMN `telefonoFamiliar`,
    DROP COLUMN `testActual`;

-- AlterTable
ALTER TABLE `informacionpersonal` DROP COLUMN `estrato`,
    DROP COLUMN `etnico`,
    DROP COLUMN `familiaresnum`,
    DROP COLUMN `genero`,
    DROP COLUMN `localidad`,
    DROP COLUMN `personascargo`,
    DROP COLUMN `tipovivienda`,
    DROP COLUMN `vivienda`;

-- AlterTable
ALTER TABLE `salud` DROP COLUMN `Internet`,
    DROP COLUMN `alcohol`,
    DROP COLUMN `discapacidad`,
    DROP COLUMN `enfermecronica`,
    DROP COLUMN `eps`,
    DROP COLUMN `nicotina`,
    DROP COLUMN `suspsicoactivas`,
    ADD COLUMN `accesosalud` VARCHAR(191) NOT NULL,
    ADD COLUMN `diagnostico` VARCHAR(191) NOT NULL,
    ADD COLUMN `nivelestres` VARCHAR(191) NOT NULL,
    ADD COLUMN `pensamientosuicidas` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `situacionlaboral` DROP COLUMN `ascenso`,
    DROP COLUMN `sector`,
    ADD COLUMN `pesonashogar` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `cita`;

-- DropTable
DROP TABLE `condicionesvivienda`;

-- DropTable
DROP TABLE `consultorio`;

-- DropTable
DROP TABLE `ghq12`;

-- DropTable
DROP TABLE `historialagendamiento`;

-- DropTable
DROP TABLE `practicante`;

-- DropTable
DROP TABLE `tests`;
