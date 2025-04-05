/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course_id` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "course_id",
ADD COLUMN     "courseId" SERIAL NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId");
