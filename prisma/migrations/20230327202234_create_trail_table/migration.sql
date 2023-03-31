/*
  Warnings:

  - You are about to drop the column `authorId` on the `trail` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `trail` table. All the data in the column will be lost.
  - Added the required column `title` to the `trail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "duration" TEXT,
    CONSTRAINT "trail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_trail" ("created_at", "description", "duration", "id", "published", "userId") SELECT "created_at", "description", "duration", "id", "published", "userId" FROM "trail";
DROP TABLE "trail";
ALTER TABLE "new_trail" RENAME TO "trail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
