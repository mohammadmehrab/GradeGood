import { useEffect, useState } from "react";
import styles from "./CourseSetUp.module.css";
import { useAuth } from "../contexts/authcontext";
import { submitCourse } from "../../../backend/src/gradeInput";


type Course={ 
  name: string;
  courseId: number;
  grade: number;
  creditHours: number;
  userId: number;
}
export default function GradeInputPage() {

  const [courseName, setCourseName] = useState("");
  const [creditHours, setCreditHours] = useState(0);
  const [grade, setGrade] = useState(0);
  const [schedule, setSchedule] = useState([{day: [] as string[], startTime:"", endTime:""}])
  const [courseDetails, setCourseDetails] = useState<any[]>([]);


  //pull user id , pull courses


  const { currentUser } = useAuth();
  useEffect(()=> {
    
    
    async function getUserCourses()
    {

      if(!currentUser)
        {
          return;
        }
      let res = await fetch(`http://localhost:3000/users?email=${currentUser.email}`);
      let data = await res.json();
      const userId = data.id;
      res = await fetch(`http://localhost:3000/users/${userId}/courses`);
      data = await res.json();
      console.log(data);
      
      setCourseDetails(data.map((course:Course) => ( {name:course.name , creditHours:course.creditHours , grade:course.grade , schedule:[{day:[], startTime:"", endTime:""}]})));
    }
    getUserCourses();


  },[currentUser])


  //console.log(styles)
  const submit = async () => {


    // You can handle form submission logic here (e.g., state, validation, etc.)
    console.log(courseName, creditHours, grade,schedule);

    if (!courseName || !creditHours || !grade){
      return;
    }

    if (currentUser && currentUser.email) {
      const returnMessage = await submitCourse(
        currentUser.email,
        courseName,
        creditHours,
        grade,
    );
      console.log(returnMessage);
      const addCourse ={
        name: courseName,
        creditHours,
        grade,
        schedule,
      }
      setCourseDetails(view =>[...view,addCourse]);
    } else {
      console.log("user doesnt exist");
    }
    
    setCourseName("");
    setCreditHours(0);
    setGrade(0);
    setSchedule([{day:[], startTime:"", endTime:""}])
  };

    const newDays=(event: React.ChangeEvent<HTMLSelectElement>) =>{
      const choices = Array.from(event.target.selectedOptions, c => c.value);
      setSchedule(view => 
        view.map((i,ind)=> ind === 0? {...i, day: choices} :i))
    };

    const newTimes=(field:"startTime" | "endTime", value: string)=>{
      setSchedule(view => 
        view.map((i,ind)=> ind === 0? {...i, [field]: value} :i))
    };

    const deleteCourse = (ind: number) => {
      setCourseDetails((view) => view.filter((_,i)=> i !== ind))
    }

  return (
    <div className="h-full">
      <h1 className={styles.title}>Course Set Up</h1>
      <h2 className={styles.subtitle}>Enter your course details below.</h2>
      <div className={styles.testBorder}>
        <div className={styles.input_contain}>
          <div className={styles.input_field}>
            <label htmlFor="course-name" className="label">
              Course Name:
            </label>
            <input
              id="course-name"
              className={styles.input_box_custom}
              type="text"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="credit-hours" className="label">
              Credit Hours:
            </label>
            <input
              id="credit-hours"
              className={styles.input_box_custom}
              type="number"
              step="0.1"
              value={creditHours}
              onChange={(event) => setCreditHours(parseFloat(event.target.value))}
            />
          </div>
          <div className={styles.input_field}>
            <label htmlFor="grade" className="label">
              Grade:
            </label>
            <input
              id="grade"
              className={styles.input_box_custom}
              type="number"
              step="0.1"
              value={grade}
              onChange={(event) => setGrade(parseFloat(event.target.value))}
            />
          </div>
          
        </div>

          {schedule.map((s,i)=>(
          <div key={i} className={styles.input_contain}>
            <div className={styles.input_field}>
              <label htmlFor="day" className="label">
                Day:
              </label>
              <select
                id="day"
                className={styles.input_box_scroll}
                multiple value={s.day}
                onChange={newDays}
          >
                <optgroup label="Weekdays">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                </optgroup>
                <optgroup label="Weekends">
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                </optgroup>
              </select>
            </div>
          <div className={styles.input_field}>
            <label htmlFor="startTime" className="label">
              Time Start:
            </label>
          <input
            id="startTime"
            className={styles.input_box_custom}
            type="time"
            value={s.startTime}
            onChange={(event) => newTimes("startTime", event.target.value)}
          />
        </div>
        <div className={styles.input_field}>
          <label htmlFor="endTime" className="label">
            Time Finish:
          </label>
          <input
            id="endTime"
            className={styles.input_box_custom}
            type="time"
            value={s.endTime}
            onChange={(event) => newTimes("endTime", event.target.value)}
          />
        </div>
          </div>
        ))}
        
        
        
        
        <button className={styles.button_reg} onClick={submit}>
          Save Course Changes
        </button>
      </div>

      <div>
        {courseDetails.map((c,i)=>(
          <details key={i} className={styles.details}>
            <summary>
              <strong>{c.name}</strong>: 
            </summary>
            <p>Credit Hours: {c.creditHours}</p>
            <p>Grade: {c.grade}</p>
            <p>Schedule Details: {c.schedule[0].day.join(",")} from {c.schedule[0].startTime} to {c.schedule[0].endTime}</p>
            <button onClick={() => deleteCourse(i)} className={styles.button_small}>
              Delete
            </button>
          </details>
        ))}
      </div>
    </div>
  );
}
