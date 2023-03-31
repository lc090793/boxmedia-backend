/*
  Warnings:

  - You are about to drop the column `authorId` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `trail` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `trail` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `trail` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `course` table. All the data in the column will be lost.
  - Added the required column `contentId` to the `content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailId` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "contentId" INTEGER NOT NULL,
    "topicId" INTEGER,
    CONSTRAINT "lesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "content" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "contentId" INTEGER NOT NULL,
    CONSTRAINT "content_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_content" ("id", "published", "title") SELECT "id", "published", "title" FROM "content";
DROP TABLE "content";
ALTER TABLE "new_content" RENAME TO "content";
CREATE TABLE "new_trail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    CONSTRAINT "trail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_trail" ("authorId", "id", "published") SELECT "authorId", "id", "published" FROM "trail";
DROP TABLE "trail";
ALTER TABLE "new_trail" RENAME TO "trail";
CREATE TABLE "new_course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "trailId" INTEGER NOT NULL,
    CONSTRAINT "course_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "trail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_course" ("id", "published", "title") SELECT "id", "published", "title" FROM "course";
DROP TABLE "course";
ALTER TABLE "new_course" RENAME TO "course";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
