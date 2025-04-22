import { useState } from "react";
import styles from "./GradeInputPage.module.css";
import { useAuth } from "../contexts/authcontext";
import { submitCourse } from "../../../backend/src/gradeInput";

export default function GradeInputPage() {
  const [courseName, setCourseName] = useState("");
  const [creditHours, setCreditHours] = useState(0);
  const [grade, setGrade] = useState(0);
  const [policy, setPolicy] = useState([{ name: "", weightage: 0, grade: 0 }]);
  const [schedule, setSchedule] = useState([{day: "", startTime:"", endTime:""}])

  const { currentUser } = useAuth();

  const submit = async () => {
    // You can handle form submission logic here (e.g., state, validation, etc.)
    console.log(courseName, creditHours, grade,policy,schedule);
    if (currentUser && currentUser.email) {
      const returnMessage = await submitCourse(
        currentUser.email,
        courseName,
        creditHours,
        grade,
      );

      console.log(returnMessage);
    } else {
      console.log("user doesnt exist");
    }

    setCourseName("");
    setCreditHours(0);
    setGrade(0);
  };

    // Add new blank fields for a policy
    const newPolicy = () => {
      if (policy.length < 5) {
        setPolicy([...policy, { name: "", weightage: 0, grade: 0 }]);
      }
    };
  
    // Remove fields of a policy
    const removePolicy = () => {
      if (policy.length > 1) {
        setPolicy(policy.slice(0, -1));
      }
    };

    const newSched = () => {
      if (schedule.length < 5) {
        setSchedule([...schedule, { day: "", startTime: "", endTime: "" }]);
      }
    };
  
    // Remove fields of a policy
    const removeSched = () => {
      if (schedule.length > 1) {
        setSchedule(schedule.slice(0, -1));
      }
    };

    const handleChange = (i: number, field: string, value: number | string) => {
      const pol = [...policy];
      pol[i] = { ...pol[i], [field]: value };
      setPolicy(pol);
    };

    const handleSchedChange =(i: number, field: keyof (typeof schedule)[0], val: string)=>{
      const createSchedule = [...schedule];
      createSchedule[i][field] = val;
      setSchedule(createSchedule);
    }


  return (
    <div className="h-full">
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
        {policy.map((pol, i) => (
        <div key={i} className={styles.policy_container}>
          <div className={styles.input_contain}>
            <label>Policy Name</label>
            <input
              type="input"
              placeholder="Policy Name"
              className={styles.input_box}
              value={pol.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
            />
          </div>
          <div className={styles.input_contain}>
            <label>Weightage</label>
            <input
              type="number"
              placeholder="Weightage (0% to 100%)"
              className={styles.input_box}
              value={pol.weightage === 0 ? "" : pol.weightage}
              onChange={(e) =>
                handleChange(i, "weightage", Number(e.target.value))
              }
            />
          </div>
          <div className={styles.input_contain}>
            <label>Grade</label>
            <input
              type="decimal"
              placeholder="Grade (0 to 100)"
              className={styles.input_box}
              value={pol.grade === 0 ? "" : pol.grade}
              onChange={(e) => handleChange(i, "grade", Number(e.target.value))}
            />
          </div>
        </div>
      ))}
        
        {schedule.map((s,i)=>(
          <div key={i} className={styles.policy_container}>
<div className={styles.inputGroup}>
          <label htmlFor="day" className="label">
            Day:
          </label>
          <input
            id="day"
            className="input"
            type="text"
            value={s.day}
            onChange={(event) => handleSchedChange(i, "day", event.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="time" className="label">
            Time Start:
          </label>
          <input
            id="time"
            className="input"
            type="text"
            value={s.startTime}
            onChange={(event) => handleSchedChange(i, "startTime", event.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="time" className="label">
            Time Finish:
          </label>
          <input
            id="time"
            className="input"
            type="text"
            value={s.endTime}
            onChange={(event) => handleSchedChange(i, "endTime", event.target.value)}
          />
        </div>
          </div>
        ))}
        
        
        <button className={styles.submitBtn} onClick={submit}>
          Submit Grade
        </button>
        <button className={styles.submitBtn} onClick={newSched} disabled={schedule.length >= 5}>
          Add Time
        </button>
        <button className={styles.submitBtn} onClick={removeSched} disabled={schedule.length <= 1}>
          Remove Time
        </button>
        <button className={styles.submitBtn} onClick={newPolicy}
          disabled={policy.length >= 5}>
          Add Policy
        </button>
        <button className={styles.submitBtn} onClick={removePolicy}
          disabled={policy.length <= 1}>
          Remove Policy
        </button>


      </div>
    </div>
  );
}
