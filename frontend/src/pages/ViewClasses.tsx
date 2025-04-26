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
      console.log(data);
      setCourses(data);
    }
    if (currentUserId) getUserCourses();
  }, [currentUserId]);

  const [courses, setCourses] = useState<Course[]>([]);

  // const [form, setForm] = useState<Course>({
  //   courseId: -1,
  //   creditHours: -1,
  //   gradingPolicy: {},
  //   name: "",
  //   userId: -1,
  //   gradeLogs: [],
  // });

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
    console.log({ name, value });
    if (["creditHours", "grade"].includes(name)) {
      setCourseSetup((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setCourseSetup((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({
  //     ...prev,
  //     [name]: name === "grade" || name === "gpa" ? Number(value) : value,
  //   }));
  // };

  // const handleAdd = () => {
  //   if (
  //     form.courseId &&
  //     form.creditHours &&
  //     form.gradeLogs &&
  //     form.gradingPolicy &&
  //     form.name &&
  //     form.userId
  //   ) {
  //     setCourses((prev) => [...prev, form]);
  //     setForm({
  //       courseId: -1,
  //       creditHours: -1,
  //       gradingPolicy: {},
  //       name: "",
  //       userId: -1,
  //       gradeLogs: [],
  //     });
  //   } else {
  //     alert("Please fill in all fields!");
  //   }
  // };

  const deleteDayEntry = (index: number) => {
    // console.log("schedule before delete", courseSetup.schedule);
    // console.log(index);
    setCourseSetup((old) => ({
      ...old,
      schedule:
        old.schedule.length > 1
          ? old.schedule.filter((_, i) => i !== index)
          : [{ dayOfWeek: "", startTime: "", endTime: "" }],
    }));
  };

  const addCourse = async () => {
    setCourses((old) => [
      ...old,
      {
        courseId: -1,
        creditHours: courseSetup.creditHours,
        gradingPolicy: {},
        name: courseSetup.name,
        userId: -1,
        gradeLogs: [{ datetime: "", grade: courseSetup.grade }],
      } as Course,
    ]);

    console.log("course setup:", courseSetup);
    console.log("current user id:", currentUserId);

    alert("Course Added!");

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

    console.log(data);
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Course Set Up Section */}
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
              />
            </div>
            <div>
              <label>Credit Hours:</label>
              <input
                name="creditHours"
                type="number"
                value={courseSetup.creditHours}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label>Grade:</label>
              <input
                name="grade"
                type="number"
                value={courseSetup.grade}
                onChange={handleChange}
                className="w-full p-1 border rounded"
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
                  >
                    <option value="" disabled>
                      Select a day
                    </option>
                    {/* <option>Weekdays</option> */}
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
                    {/* <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option> */}
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

            {/* <div>
              <label>Day:</label>
              <select
                name="day"
                value={courseSetup.day}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              >
                <option>Weekdays</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
            </div>
            <div>
              <label>Time Start:</label>
              <input
                name="timeStart"
                type="time"
                value={courseSetup.timeStart}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label>Time Finish:</label>
              <input
                name="timeFinish"
                type="time"
                value={courseSetup.timeFinish}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div> */}
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

        {/* Divider Line */}
        <hr className="border-t-2 border-black" />

        {/* View Grades Section */}
        {/* <h1 className="text-2xl font-bold text-gray-900">View Courses</h1>
        <div className="bg-white p-4 rounded shadow border border-gray-200 space-y-4">
          <input
            type="text"
            name="code"
            value={form.code}
            placeholder="Course Code (e.g., CS 3354)"
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Course Title (e.g., Software Engineering)"
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="grade"
            value={form.grade || ""}
            placeholder="Grade (e.g., 94)"
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="gpa"
            step="0.1"
            value={form.gpa || ""}
            placeholder="GPA (e.g., 4.0)"
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div> */}

        {/* Course Cards */}
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-4 rounded shadow-sm border border-gray-200"
          >
            <p className="font-medium text-sm text-gray-800">
              {course.name}: {course.creditHours}
            </p>
            <p className="text-sm text-gray-700">
              Grade: {course.gradeLogs[0].grade}
            </p>
            <p className="text-sm text-gray-700">
              GPA: {(course.gradeLogs[0].grade / 100) * course.creditHours}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewGrades;
