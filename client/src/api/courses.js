export const fetchCourses = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/courses"); // your backend URL
    if (!res.ok) throw new Error("Failed to fetch courses");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
