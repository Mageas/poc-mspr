/*
  Warnings:

  - Added the required column `speciesId` to the `plants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `plants` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "plants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plants_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plants_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "plant_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plants_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "plant_species" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_plants" ("addressId", "createdAt", "id", "name", "updatedAt", "userId") SELECT "addressId", "createdAt", "id", "name", "updatedAt", "userId" FROM "plants";
DROP TABLE "plants";
ALTER TABLE "new_plants" RENAME TO "plants";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
