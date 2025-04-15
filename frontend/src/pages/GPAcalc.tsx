import React, { useState } from "react";
import styles from "./GPAcalc.module.css";

const GPAcalc: React.FC = () => {
  // Create variables and methods to store user inputs
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [policy, setPolicy] = useState([{ name: "", weightage: 0, grade: 0 }]);
  const [courseGrade, setCourseGrade] = useState(0);
  const [courseGPA, setCourseGPA] = useState(0);
  const [msg, setMsg] = useState("");
  const [displayResult, setDisplayResult] = useState(false);

  const GPAcalculation = () => {
    // Call input validation function to check for invalid/exceptional inputs
    if (!checkInputs()) {
      return;
    }

    //Add up the grade*weightage to get the final grade
    const gradeFin = policy.reduce(
      (sum, pol) => sum + (pol.grade * pol.weightage) / 100,
      0
    );
    setCourseGrade(gradeFin);

    //Depending on the final grade, display GPA.
    let gpaFin = 0;
    if (gradeFin >= 93) {
      gpaFin = 4.0;
    } else if (gradeFin >= 90) {
      gpaFin = 3.67;
    } else if (gradeFin >= 87) {
      gpaFin = 3.33;
    } else if (gradeFin >= 83) {
      gpaFin = 3.0;
    } else if (gradeFin >= 80) {
      gpaFin = 2.67;
    } else if (gradeFin >= 77) {
      gpaFin = 2.33;
    } else if (gradeFin >= 73) {
      gpaFin = 2.0;
    } else if (gradeFin >= 70) {
      gpaFin = 1.67;
    } else {
      gpaFin = 0.0;
    }

    // Set the final GPA
    setCourseGPA(gpaFin);
    setDisplayResult(true);
  };

  // Reset all inputs of all fields
  const resetInputs = () => {
    setCourseID("");
    setPolicy([{ name: "", weightage: 0, grade: 0 }]);
    setCourseGPA(0);
    setCourseGrade(0);
    setCourseName("");
    setDisplayResult(false);
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

  // Update changes of input when policy fields are typed
  const handleChange = (i: number, field: string, value: number | string) => {
    const pol = [...policy];
    pol[i] = { ...pol[i], [field]: value };
    setPolicy(pol);
  };

  // Check all inputs
  const checkInputs = () => {
    // If any of the fields are blank
    if (
      courseID.trim() === "" ||
      courseName.trim() === "" ||
      policy.some((pol) => pol.name.trim() === "")
    ) {
      setMsg("Error: You must have left some fields empty!");
      setDisplayResult(true);
      return false;
    }
    // If policy length is not in range
    if (policy.some((p) => p.name.length < 1 || p.name.length > 15)) {
      setMsg("Error: Your policy must be in length between 1 to 15.");
      setDisplayResult(true);
      return false;
    }

    // If courseID is not a 4 digit integer
    if (!/^\d{4}$/.test(courseID)) {
      setMsg("Error: Your course ID must be a 4 digit integer!");
      setDisplayResult(true);
      return false;
    }
    // if course name length is not in range
    if (courseName.length < 1 || courseName.length > 15) {
      setMsg("Error: Your course name must be in length between 1 to 15.");
      setDisplayResult(true);
      return false;
    }

    //Add up the weightage of every policy, check if they add up to 100
    const weight = policy.reduce((sum, pol) => sum + Number(pol.weightage), 0);
    if (weight !== 100) {
      setMsg("Error: Total weightage needs to add up to 100. ");
      setDisplayResult(true);
      return false;
    }

    //check every policy's grade and weightage to see if they are in range
    for (const p of policy) {
      if (p.weightage < 0 || p.weightage > 100) {
        setMsg(
          "Error: Weightage must be in range of 0 to 100. Also input must solely be integer..."
        );
        setDisplayResult(true);
        return false;
      }
      if (p.grade < 0 || p.grade > 100) {
        setMsg(
          "Error: Grade must be in range of 0 to 100. Also input must solely be integer..."
        );
        setDisplayResult(true);
        return false;
      }
    }

    // return true if every check is passed
    return true;
  };

  return (
    <div className={styles.regContain}>
      {/* Heading texts */}
      <h1 className={styles.heading}>GPA Calculation</h1>
      <div className={styles.course_info}>
        <div className={styles.input_contain}>
          <label>Course ID</label>
          <input
            type="input"
            placeholder="Course ID"
            className={styles.input_box}
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          />
        </div>
        <div className={styles.input_contain}>
          <label>Course Name</label>
          <input
            type="input"
            placeholder="Course Name"
            className={styles.input_box}
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
      </div>

      {/* input boxes */}

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
      {/* buttons to add, remove policy, reset inputs, and ccalculate GPA */}
      <div className={styles.button_contain}>
        <button
          onClick={newPolicy}
          disabled={policy.length >= 5}
          className={`${styles.input_submit} ${styles.button}`}
        >
          Add Policy
        </button>
        <button
          onClick={removePolicy}
          disabled={policy.length <= 1}
          className={`${styles.input_submit} ${styles.button}`}
        >
          Remove Policy
        </button>
      </div>

      <div className={styles.button_contain}>
        <button
          onClick={GPAcalculation}
          className={`${styles.input_submit} ${styles.button}`}
        >
          Calculate GPA
        </button>
        <button
          onClick={resetInputs}
          className={`${styles.input_submit} ${styles.button}`}
        >
          Reset fields
        </button>
      </div>

      {/* Display results */}

      {displayResult && (
        <div className={styles.res}>
          <h3>Course ID: {courseID}</h3>
          <h3>Course: {courseName} </h3>
          <h2>Course Grade: {courseGrade?.toFixed(1)}</h2>
          <h2>Course GPA: {courseGPA?.toFixed(2)}</h2>
          <div className="message">{msg}</div>
        </div>
      )}
    </div>
  );
};

export default GPAcalc;
