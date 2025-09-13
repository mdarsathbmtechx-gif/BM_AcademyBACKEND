import React, { useEffect, useState } from "react";
import API from "../api";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("courses/");
        setCourses(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await API.post("enrollments/", { course: courseId });
      alert("Enrolled successfully!");
    } catch (err) {
      console.error(err.response.data);
      alert("Enrollment failed!");
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <button onClick={() => handleEnroll(course.id)}>Enroll</button>
        </div>
      ))}
    </div>
  );
}
