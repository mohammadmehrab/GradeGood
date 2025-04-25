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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "grade" || name === "gpa" ? Number(value) : value,
    }));
  };

  const handleAdd = () => {
    if (form.code && form.title && form.grade && form.gpa) {
      setCourses((prev) => [...prev, form]);
      setForm({ code: "", title: "", grade: 0, gpa: 0.0 }); // reset form
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">View Courses</h1>

        {/* Input Form */}
        <div className="bg-white p-4 mb-6 rounded shadow border border-gray-200 space-y-4">
          <input
            type="text"
            name="code"
            value={form.code}
            placeholder="Course Code (e.g., CS 3354)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Course Title (e.g., Software Engineering)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="grade"
            value={form.grade || ""}
            placeholder="Grade (e.g., 94)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="gpa"
            step="0.1"
            value={form.gpa || ""}
            placeholder="GPA (e.g., 4.0)"
            onChange={handleChange}
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
