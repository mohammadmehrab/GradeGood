/*
  Warnings:

  - You are about to drop the column `grade` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventTime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventTime" DROP CONSTRAINT "EventTime_eventId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "grade",
ADD COLUMN     "gradingPolicy" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "name",
ADD COLUMN     "courseId" INTEGER,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "EventTime";

-- CreateTable
CREATE TABLE "GradeLog" (
    "gradeLogId" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "GradeLog_pkey" PRIMARY KEY ("gradeLogId")
);

-- AddForeignKey
ALTER TABLE "GradeLog" ADD CONSTRAINT "GradeLog_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;
