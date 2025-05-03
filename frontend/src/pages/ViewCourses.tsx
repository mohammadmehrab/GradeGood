import React, { useEffect, useState } from "react";
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

type ScheduleDay = {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

const ViewGrades: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentUserId, setCurrentUserId] = useState<number>(-1);
  const [courses, setCourses] = useState<Course[]>([]);


  const calculateGPA = (grade: number): number => {
    if (grade >= 90) return 4.0;
    if (grade >= 80) return 3.0;
    if (grade >= 70) return 2.0;
    if (grade >= 60) return 1.0;
    return 0.0;
  };

  const calculateCumulativeGPA = (courses: Course[]): number => {
    if (courses.length === 0) return 0;
    
    let totalGradePoints = 0;
    let totalCreditHours = 0;
    
    courses.forEach(course => {
      if (course.gradeLogs.length > 0) {
        const grade = course.gradeLogs[0].grade;
        const gpa = calculateGPA(grade);
        totalGradePoints += gpa * course.creditHours;
        totalCreditHours += course.creditHours;
      }
    });
    
    return totalCreditHours > 0 ? totalGradePoints / totalCreditHours : 0;
  };

  useEffect(() => {
    async function getCurrentUserId() {
      const res = await fetch(
        `http://localhost:3000/users?email=${currentUser?.email}`
      );
      const data = await res.json();
      setCurrentUserId(data.id);
    }

    if (currentUser) getCurrentUserId();
  }, [currentUser]);

  useEffect(() => {
    async function getUserCourses() {
      if (!currentUserId) {
        return;
      }

      const res = await fetch(
        `http://localhost:3000/users/${currentUserId}/courses`
      );
      const data = await res.json();
      setCourses(data);
    }
    if (currentUserId) getUserCourses();
  }, [currentUserId]);

  const [courseSetup, setCourseSetup] = useState({
    name: "",
    creditHours: 0,
    grade: 0,
    schedule: [{ dayOfWeek: "", startTime: "", endTime: "" }] as ScheduleDay[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (["creditHours", "grade"].includes(name)) {
      setCourseSetup((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setCourseSetup((prev) => ({ ...prev, [name]: value }));
    }
  };

  const deleteDayEntry = (index: number) => {
    setCourseSetup((old) => ({
      ...old,
      schedule:
        old.schedule.length > 1
          ? old.schedule.filter((_, i) => i !== index)
          : [{ dayOfWeek: "", startTime: "", endTime: "" }],
    }));
  };

  const addCourse = async () => {

    if (!courseSetup.name || courseSetup.creditHours <= 0 || courseSetup.grade < 0 || courseSetup.grade > 100) {
      alert("Please fill in all fields with valid values!");
      return;
    }

    try {

      const newCourse = {
        courseId: -1, 
        creditHours: courseSetup.creditHours,
        gradingPolicy: {},
        name: courseSetup.name,
        userId: currentUserId,
        gradeLogs: [{ datetime: new Date().toISOString(), grade: courseSetup.grade, gradeLogId: -1, courseId: -1 }],
      } as Course;

      setCourses((old) => [...old, newCourse]);

      const res = await fetch(`http://localhost:3000/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...courseSetup,
          userId: currentUserId,
        }),
      });

      const data = await res.json();
      

      setCourses(old => old.map(c => 
        c.courseId === -1 && c.name === newCourse.name ? { ...c, courseId: data.courseId } : c
      ));

      setCourseSetup({
        name: "",
        creditHours: 0,
        grade: 0,
        schedule: [{ dayOfWeek: "", startTime: "", endTime: "" }],
      });

      alert("Course Added Successfully!");
    } catch (error) {
      console.error("Error adding course:", error);

      setCourses(old => old.filter(c => c.courseId !== -1 || c.name !== courseSetup.name));
      alert("Failed to add course. Please try again.");
    }
  };


  const deleteCourse = async (courseId: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {

      setCourses(old => old.filter(course => course.courseId !== courseId));


      await fetch(`http://localhost:3000/courses/${courseId}`, {
        method: "DELETE",
      });

      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);

      const res = await fetch(
        `http://localhost:3000/users/${currentUserId}/courses`
      );
      const data = await res.json();
      setCourses(data);
      alert("Failed to delete course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="bg-green-100 border border-black p-6 rounded">
          <h2 className="text-3xl font-bold text-center mb-1">Course Set Up</h2>
          <p className="text-center mb-6">Enter your course details below.</p>
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div>
              <label>Course Name:</label>
              <input
                name="name"
                type="text"
                value={courseSetup.name}
                onChange={handleChange}
                className="w-full p-1 border rounded"
                required
              />
            </div>
            <div>
              <label>Credit Hours:</label>
              <input
                name="creditHours"
                type="number"
                min="0"
                step="0.5"
                value={courseSetup.creditHours}
                onChange={handleChange}
                className="w-full p-1 border rounded"
                required
              />
            </div>
            <div>
              <label>Grade (0-100):</label>
              <input
                name="grade"
                type="number"
                min="0"
                max="100"
                value={courseSetup.grade}
                onChange={handleChange}
                className="w-full p-1 border rounded"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_40px] gap-6">
            {courseSetup.schedule.map((day, i) => (
              <React.Fragment key={i}>
                <div>
                  <label>Day:</label>
                  <select
                    name="day"
                    value={day.dayOfWeek}
                    onChange={(event) =>
                      setCourseSetup((old) => {
                        const newSchedule = [...old.schedule];
                        newSchedule[i] = {
                          ...newSchedule[i],
                          dayOfWeek: event.target.value,
                        };
                        return { ...old, schedule: newSchedule };
                      })
                    }
                    className="w-full p-1 border rounded"
                    required
                  >
                    <option value="" disabled>Select a day</option>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
                      .filter(
                        (day) =>
                          !courseSetup.schedule.some(
                            (schedDay, schedIndex) =>
                              schedDay.dayOfWeek === day && schedIndex !== i
                          )
                      )
                      .map((day) => (
                        <option key={day}>{day}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label>Time Start:</label>
                  <input
                    name="timeStart"
                    type="time"
                    value={day.startTime}
                    onChange={(event) =>
                      setCourseSetup((old) => {
                        const newSchedule = [...old.schedule];
                        newSchedule[i] = {
                          ...newSchedule[i],
                          startTime: event.target.value,
                        };
                        return { ...old, schedule: newSchedule };
                      })
                    }
                    className="w-full p-1 border rounded"
                    required
                  />
                </div>
                <div>
                  <label>Time Finish:</label>
                  <input
                    name="timeFinish"
                    type="time"
                    value={day.endTime}
                    onChange={(event) =>
                      setCourseSetup((old) => {
                        const newSchedule = [...old.schedule];
                        newSchedule[i] = {
                          ...newSchedule[i],
                          endTime: event.target.value,
                        };
                        return { ...old, schedule: newSchedule };
                      })
                    }
                    className="w-full p-1 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="bg-red-500 rounded-2xl h-[50%] w-[100%]"
                    onClick={() => deleteDayEntry(i)}
                  >
                    X
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={addCourse}
          >
            Save Course Changes
          </button>
          <button
            className="mt-6 px-4 py-2 mx-4 bg-fuchsia-300 text-white rounded hover:bg-fuchsia-600"
            onClick={() =>
              setCourseSetup((old) => {
                if (old.schedule.length < 5)
                  return {
                    ...old,
                    schedule: [
                      ...old.schedule,
                      { dayOfWeek: "", startTime: "", endTime: "" },
                    ],
                  };
                return old;
              })
            }
          >
            Add Day
          </button>
        </div>

        <hr className="border-t-2 border-black" />

        <div className="bg-white p-4 rounded shadow border border-gray-200">
          <h3 className="text-xl font-bold mb-2">Cumulative GPA</h3>
          <p className="text-lg">
            {calculateCumulativeGPA(courses).toFixed(2)}
          </p>
        </div>

        {courses.map((course) => (
          <div
            key={course.courseId}
            className="bg-white p-4 mb-4 rounded shadow-sm border border-gray-200 relative"
          >
            <button
              onClick={() => deleteCourse(course.courseId)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              title="Delete course"
            >
              ×
            </button>
            <h3 className="font-bold text-lg">{course.name}</h3>
            <p className="text-sm text-gray-700">
              Credit Hours: {course.creditHours}
            </p>
            <p className="text-sm text-gray-700">
              Grade: {course.gradeLogs[0]?.grade || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              GPA: {course.gradeLogs[0] ? calculateGPA(course.gradeLogs[0].grade).toFixed(2) : "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              Quality Points: {course.gradeLogs[0] ? (calculateGPA(course.gradeLogs[0].grade) * course.creditHours).toFixed(2) : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewGrades;