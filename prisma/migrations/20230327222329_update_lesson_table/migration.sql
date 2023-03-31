/*
  Warnings:

  - Added the required column `description` to the `lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `lesson` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "lesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lesson" ("created_at", "id", "published", "title", "topicId") SELECT "created_at", "id", "published", "title", "topicId" FROM "lesson";
DROP TABLE "lesson";
ALTER TABLE "new_lesson" RENAME TO "lesson";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
