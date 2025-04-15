import { useState } from "react";
import styles from "./GradeInputPage.module.css";
import { useAuth } from "../contexts/authcontext";
import { submitCourse } from "../../../backend/src/gradeInput";

export default function GradeInputPage() {
  const [courseName, setCourseName] = useState("");
  const [creditHours, setCreditHours] = useState(0);
  const [grade, setGrade] = useState(0);

  const { currentUser } = useAuth();

  const submit = async () => {
    // You can handle form submission logic here (e.g., state, validation, etc.)
    console.log(courseName, creditHours, grade);
    if (currentUser && currentUser.email) {
      const returnMessage = await submitCourse(
        currentUser.email,
        courseName,
        creditHours,
        grade
      );
      console.log(returnMessage);
    } else {
      console.log("user doesnt exist");
    }

    setCourseName("");
    setCreditHours(0);
    setGrade(0);
  };

  return (
    <div>
      <h1 className={styles.title}>Course Grade Input</h1>
      <h2 className={styles.subtitle}>Enter your course details below.</h2>
      <div className={`${styles.inputForm} ${styles.testBorder}`}>
        <div className={styles.inputGroup}>
          <label htmlFor="course-name" className="label">
            Course Name:
          </label>
          <input
            id="course-name"
            className="input"
            type="text"
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="credit-hours" className="label">
            Credit Hours:
          </label>
          <input
            id="credit-hours"
            className="input"
            type="number"
            step="0.1"
            value={creditHours}
            onChange={(event) => setCreditHours(parseFloat(event.target.value))}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="grade" className="label">
            Grade:
          </label>
          <input
            id="grade"
            className="input"
            type="number"
            step="0.01"
            value={grade}
            onChange={(event) => setGrade(parseFloat(event.target.value))}
          />
        </div>
        <button className={styles.submitBtn} onClick={submit}>
          Submit Grade
        </button>
      </div>
    </div>
  );
}
