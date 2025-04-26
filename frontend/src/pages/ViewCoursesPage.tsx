import { useEffect, useState } from "react";
import styles from "./ViewCoursesPage.module.css";
import { useAuth } from "../contexts/authcontext";

type GradeLog = {
  gradeLogId: number;
  datetime: string;
  grade: number;
  courseId: number;
};

type Course = {
  courseId: number;
  creditHours: number;
  gradingPolicy: object;
  name: string;
  userId: number;
  gradeLogs: GradeLog[];
};

export default function ViewCoursesPage() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    async function getUserCourses() {
      if (!currentUser) {
        return;
      }
      let res = await fetch(
        `http://localhost:3000/users?email=${currentUser.email}`
      );
      let data = await res.json();
      const userId = data.id;
      res = await fetch(`http://localhost:3000/users/${userId}/courses`);
      data = await res.json();
      console.log(data);

      //setCourseDetails(data.map((course:Course) => ( {name:course.name , creditHours:course.creditHours , grade:course.grade , schedule:[{day:[], startTime:"", endTime:""}]})));
      setCourses(data);
    }
    getUserCourses();
  }, [currentUser]);

  //use this once db is working
  /*
    <div className={styles.container}>
        <h1>Your Courses</h1>
        <div>
        {courses.map((course, i) => (
          <div key={i} className={styles.courseCard}>
            <p><strong>Name:</strong> {course.name}</p>
            <p><strong>Course ID:</strong> {course.courseId}</p>
            <p><strong>Grade:</strong> {course.grade}</p>
            <p><strong>Credit Hours:</strong> {course.creditHours}</p>
            <p><strong>User ID:</strong> {course.userId}</p>
          </div>
        ))}
        </div>
      </div>
      */
  return (
    <div className={styles.container}>
      <div className={styles.courseintro}>
        <h1>Your Courses</h1>
      </div>
      <div className={styles.coursesList}>
        {courses.map((course, i) => (
          <div key={i} className={styles.courseCard}>
            <p>
              <strong>Name:</strong> {course.name}
            </p>
            <p>
              <strong>Course ID:</strong> {course.courseId}
            </p>
            <p>
              <strong>Grade:</strong> {course.gradeLogs[0].grade}
            </p>
            <p>
              <strong>Credit Hours:</strong> {course.creditHours}
            </p>
            <p>
              <strong>User ID:</strong> {course.userId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
