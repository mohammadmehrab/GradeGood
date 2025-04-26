import { useEffect, useState } from "react";
import styles from "./ViewCoursesPage.module.css";
import { useAuth } from "../contexts/authcontext";

type Course = {
  name: string;
  courseId: number;
  grade: number;
  creditHours: number;
  userId: number;
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

  return (
    <div>
      {" "}
      hello{" "}
      {courses.map((course, i) => (
        <div> {course.name} </div>
      ))}
    </div>
  );
}
