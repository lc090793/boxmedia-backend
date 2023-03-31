/*
  Warnings:

  - You are about to drop the column `couseId` on the `content` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "content_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_content" ("created_at", "id", "published", "title") SELECT "created_at", "id", "published", "title" FROM "content";
DROP TABLE "content";
ALTER TABLE "new_content" RENAME TO "content";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
