import React, { useState } from "react";

interface Course {
  code: string;
  title: string;
  grade: number;
  gpa: number;
}

const ViewGrades: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Course>({
    code: "",
    title: "",
    grade: 0,
    gpa: 0.0,
  });

  const [courseSetup, setCourseSetup] = useState({
    name: "",
    day: "Weekdays",
    creditHours: 0,
    grade: 0,
    timeStart: "",
    timeFinish: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (["creditHours", "grade"].includes(name)) {
      setCourseSetup((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setCourseSetup((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "grade" || name === "gpa" ? Number(value) : value,
    }));
  };

  const handleAdd = () => {
    if (form.code && form.title && form.grade && form.gpa) {
      setCourses((prev) => [...prev, form]);
      setForm({ code: "", title: "", grade: 0, gpa: 0.0 });
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Course Set Up Section */}
        <div className="bg-green-100 border border-black p-6 rounded">
          <h2 className="text-3xl font-bold text-center mb-1">Course Set Up</h2>
          <p className="text-center mb-6">Enter your course details below.</p>
          <div className="grid grid-cols-3 gap-6">
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
            <div>
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
            </div>
          </div>
          <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Course Changes
          </button>
        </div>

        {/* Divider Line */}
        <hr className="border-t-2 border-black" />

        {/* View Grades Section */}
        <h1 className="text-2xl font-bold text-gray-900">View Courses</h1>
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
        </div>

        {/* Course Cards */}
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-4 rounded shadow-sm border border-gray-200"
          >
            <p className="font-medium text-sm text-gray-800">
              {course.code}: {course.title}
            </p>
            <p className="text-sm text-gray-700">Grade: {course.grade}</p>
            <p className="text-sm text-gray-700">GPA: {course.gpa}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewGrades;

