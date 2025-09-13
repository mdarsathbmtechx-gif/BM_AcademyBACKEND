import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("courses/");
      setCourses(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async () => {
    const title = prompt("Course Title:");
    const description = prompt("Course Description:");
    if (!title || !description) return;

    try {
      await API.post("courses/", { title, description });
      fetchCourses();
    } catch (err) {
      console.error(err.response.data);
      alert("Failed to create course");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleCreateCourse}>Add New Course</button>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}
