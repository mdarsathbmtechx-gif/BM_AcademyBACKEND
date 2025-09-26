// src/components/Courses/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch"; // ✅ shared helper

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // ------------------ Fetch course details ------------------
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await authFetch(`http://127.0.0.1:8000/api/courses/${courseId}/`);
        if (!res.ok) throw new Error("Failed to fetch course details");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId, navigate]);

  // ------------------ Loading/Error States ------------------
  if (loading) return <div className="text-center py-20 text-gray-500">Loading course details...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!course) return <div className="text-center py-20 text-gray-500">No course found.</div>;

  const {
    title,
    description,
    price,
    original_price,
    rating,
    learners,
    language,
    duration,
    modules,
    image_url,
  } = course;

  const modulesCount = modules?.length || 0;
  const currentPrice = price ?? 0;
  const originalPrice = original_price ?? currentPrice;
  const savings = originalPrice - currentPrice;

  const renderStars = (rate) => {
    const stars = [];
    const rounded = Math.round(rate || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rounded ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // ------------------ Enroll Handler ------------------
  const handleEnroll = async () => {
    try {
      // 1️⃣ Create order
      const orderRes = await authFetch(
        "http://127.0.0.1:8000/api/courses/create_order/",
        {
          method: "POST",
          body: JSON.stringify({ course_id: courseId }),
        }
      );
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Order creation failed");

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_Gnz2IQNWIUgqNb",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "BM Academy",
        description: course.title,
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            const verifyRes = await authFetch(
              "http://127.0.0.1:8000/api/courses/confirm_payment/",
              {
                method: "POST",
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );
            const verifyData = await verifyRes.json();
            if (verifyRes.ok) alert("Payment successful! You are now enrolled.");
            else alert("Payment failed: " + verifyData.error);
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },
        prefill: {
          email: user.email || "",
          contact: user.phone || "",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  // ------------------ JSX ------------------
  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
            {image_url && (
              <img
                src={image_url}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-700 mb-4">{description}</p>

            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-gray-600 ml-2">{learners || 0} learners</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {originalPrice !== currentPrice && (
                <span className="line-through text-gray-400 text-lg">₹{originalPrice}</span>
              )}
              <span className="text-2xl font-bold text-green-600">₹{currentPrice}</span>
              {savings > 0 && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Save ₹{savings}!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{modulesCount}</div>
                <div className="text-sm">Modules</div>
              </div>
              <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{duration || "N/A"}</div>
                <div className="text-sm">Duration</div>
              </div>
              <div className="bg-purple-50 text-purple-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{language || "N/A"}</div>
                <div className="text-sm">Language</div>
              </div>
              <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg text-center shadow-sm">
                <div className="font-bold text-lg">{rating || "0"}</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
          </div>

          {modules?.length > 0 && (
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Modules</h2>
              <ul className="space-y-2">
                {modules.map((mod, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
                  >
                    <span>{mod.title}</span>
                    <span className="text-gray-500 text-sm">{mod.duration || "N/A"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0 lg:sticky lg:top-28">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
            <button
              onClick={handleEnroll}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            >
              Enroll Now
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-300 transition">
              Preview Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
