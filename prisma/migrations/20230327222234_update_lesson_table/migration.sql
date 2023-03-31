/*
  Warnings:

  - You are about to drop the column `contentId` on the `lesson` table. All the data in the column will be lost.
  - Made the column `topicId` on table `lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
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
