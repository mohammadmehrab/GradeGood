import { useState } from "react";
import styles from "./GoalSet.module.css";
import ProgChart from "./ProgChart";

type Policy = {
  name: string;
  goal: number;
  weightage: number;
  progress: number[];
};

export default function GoalSet(){
    const [courseID, setCourseID] = useState("");
    const [courseName, setCourseName] = useState("");
    const [msg, setMsg] = useState("");
    const [displayResult, setDisplayResult] = useState(false);
    const [policy, setPolicy] = useState<Policy[]>([
        {name: "Homework", goal: 100, weightage: 0, progress: []},
        {name: "Quiz", goal: 100, weightage: 0, progress: []},
    ]);

    const [progInputs, setProgInputs] = useState<number[]>(
        policy.map(()=>0)
    )

    const newGrade = (i: number, grade: number)=>{
        if (grade < 0 || grade > 100 || isNaN(grade)){
            setMsg("Grade must be between 0 to 100");
            return;
        }
        const upGrade = [...policy];
        const upInputs = [...progInputs];
        upGrade[i].progress.push(grade);
        upInputs[i] = 0;
        setPolicy(upGrade);
        setProgInputs(upInputs);
        
    };

    const removeGrade = (polI: number, gI: number) => {
        const upInputs = [...policy];
        upInputs[polI].progress.splice(gI, 1);
        setPolicy(upInputs);
    }

    const newWeight = (i: number, weight: number) => {
        const upWeight = [...policy];
        upWeight[i].weightage = weight;
        setPolicy(upWeight);
    }

    const findAvg = (grades: number[]) =>{
        if (grades.length === 0){
            return 0;
        }
        const finalGrade = grades.reduce((total,g)=> total + g, 0);
        return finalGrade/grades.length;
    };

    const getFinalGrade = () => {
        let totalGrade = 0;
        policy.forEach((p) => {
            const avg = findAvg(p.progress);
            totalGrade += (avg * p.weightage) / 100;
        });
        return getGPA(totalGrade);
    }

    const getGPA = (gradeFin: number) => {
        if (gradeFin >= 93) {
            return 4.0;
          } else if (gradeFin >= 90) {
            return 3.67;
          } else if (gradeFin >= 87) {
            return 3.33;
          } else if (gradeFin >= 83) {
            return 3.0;
          } else if (gradeFin >= 80) {
            return 2.67;
          } else if (gradeFin >= 77) {
            return 2.33;
          } else if (gradeFin >= 73) {
            return 2.0;
          } else if (gradeFin >= 70) {
            return 1.67;
          } else if (gradeFin >= 67) {
            return 1.33;
          } else if (gradeFin >= 63) {
            return 1.00;
          } else if (gradeFin >= 60) {
            return 0.67;
          } else if (gradeFin >= 57) {
            return 0.33;
          } else {
            return 0.0;
          }
          
    }

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
        if (courseName.length < 1 || courseName.length > 30) {
          setMsg("Error: Your course name must be in length between 1 to 30.");
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
          if (p.progress.some((g) => g < 0 || g > 100)) {
            setMsg(
              "Error: Grade must be in range of 0 to 100. Also input must solely be integer..."
            );
            setDisplayResult(true);
            return false;
          }
          if (p.goal < 0 || p.goal > 100){
            setMsg("Error: Goal must be in a range of 0 to 100.");
            setDisplayResult(true);
            return false;
          }
        }
    
        // return true if every check is passed
        return true;
      };

    const handleSubmit = () =>{
        if (checkInputs()){
            const gpa = getFinalGrade();
            setMsg(`Your GPA for the course: ${gpa.toFixed(2)}`);
            setDisplayResult(true);
        }
    };

    const feedBack = (goal: number, average: number)=>{
        if (average >= goal){
            return "That's what's up my goat! Keep up the great work!";
        }
        else if ((goal - average) <= 5){
            return "You are so close! Get to the finish line!";
        }
        return "You still gotta push, but I believe in you!"
    };

    const newGoal = (i: number, g: number)=>{
        const upGoal = [...policy];
        upGoal[i].goal = g;
        setPolicy(upGoal);
    }

    const newPolicyName = (i: number, pn: string)=>{
        const upPolicy = [...policy];
        upPolicy[i].name = pn;
        setPolicy(upPolicy);
    }

    const newPolicy = () =>{
        if (policy.length < 5){
            setPolicy([...policy, {name: `Policy ${policy.length + 1}`, goal: 100, weightage: 0, progress: []}])
        }
    }

    const removePolicy =()=>{
        if (policy.length > 1){
            setPolicy(policy.slice(0,-1));
        }
    }

    return(
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Set Your Grade Goal</h1>
            <div className={styles.course_info}>
                <div className={styles.input_contain}>
                <label>
                    Course ID:
                </label>
                <input
                    type="text" value={courseID} onChange={(e) => setCourseID(e.target.value)}
                    className={styles.input_box_policy}
                />
                </div>

                <div className={styles.input_contain}>
                <label>
                    Course Name:
                </label>
                <input
                    type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}
                    className={styles.input_box_policy}
                />
                </div>
            </div>

            {policy.map((pol,i)=>{
                const avg = findAvg(pol.progress);
                return(
                    <div key={i} className="bg-white p-4 mb-6 rounded shadow border border-gray-200 space-y-4">
                        <h2>
                            <input
                                value={pol.name} type="text" onChange={(e) => newPolicyName(i,e.target.value)}
                                className={styles.input_box_policy}
                            />
                        </h2>
                        <div className={styles.input_contain}>
                            <label>Set your goal: </label>
                            <input 
                                type="number" min={0} max={100} 
                                value={pol.goal} onChange={(e) => newGoal(i, parseFloat(e.target.value))}
                                className={styles.input_box_grade}
                                />
                            <div>
                                <strong>Goal Grade: </strong>{pol.goal}
                            </div>
                        </div>

                        <div className={styles.input_contain}>
                            <label>Add Weightage: </label>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={pol.weightage}
                                onChange={(e) => newWeight(i, parseFloat(e.target.value))}
                                className={styles.input_box_grade}
                            />
                        </div>

                        <div className={styles.input_contain}>
                            <label>Add Progress Grade: </label>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    const updateInputs = [...progInputs];
                                    updateInputs[i] = val;
                                    setProgInputs(updateInputs);
                                }}
                                className={styles.input_box_grade}
                            />
                            <button onClick={()=> newGrade(i, progInputs[i])} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                Add Grade
                            </button>
                        </div>

                        <div className={styles.input_contain}>
                            <strong>Progress Entry:</strong> {pol.progress.length === 0 ? (
                                <span>No element in progress</span>
                            ):(
                                <ul className={styles.gradeList}>
                                    {pol.progress.map((grade, gIndex)=>(
                                        <li key={gIndex}>
                                            Grade {gIndex +1}: {grade}{" "}
                                            <button onClick={()=>removeGrade(i,gIndex)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <p className={styles.average}>Current Average: {avg.toFixed(2)}</p>
                        <p className={styles.feedback}>{feedBack(pol.goal, avg)}</p>     
                    </div>
                );
            })}

            <div className={styles.button_contain}>
                <button onClick={newPolicy} disabled={policy.length >= 5} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Add Policy
                </button>
                <button onClick={removePolicy} disabled={policy.length <= 1} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Remove Policy
                </button>
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Find GPA and Chart
                </button>
            </div>

            {displayResult &&
                <div className={styles.result}>
                    {msg}
                </div>
            }
            {policy.some(p=>p.progress.length > 0) && (
                <div className={styles.chart_contain}>
                    <h3>Policy Progress Chart: {courseName.trim() && courseID.trim() ? `${courseName} (${courseID})` : "Nameless Course"}</h3>
                    <ProgChart pols={policy}/>
                </div>
            )}
        </div>
    )
}
