// src/components/Payments/Payments.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  
  useEffect(() => {
    if (!course) {
      // If no course info, redirect back
      navigate("/courses");
    }
  }, [course, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: course.price * 100,
    currency: "INR",
    name: "BM Academy",
    description: `Enroll in ${course.title}`,
    image: "/logo.png",
    order_id: "", // backend-generated order ID recommended
    handler: async function (response) {
      console.log("Payment Success:", response);

      try {
        // Call backend to save enrollment
        const r = await fetch(`${import.meta.env.VITE_BASE_URI}enroll_course/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ course_id: course.id }),
        });
        const data = await r.json();
        if (data.success) {
          alert("Payment successful! You are now enrolled.");
        } else {
          alert(data.message || "Enrollment failed.");
        }
      } catch (err) {
        console.error(err);
        alert("Enrollment failed due to network error.");
      }

      navigate("/dashboard/student");
    },
    prefill: {
      name: JSON.parse(localStorage.getItem("user"))?.name || "",
      email: JSON.parse(localStorage.getItem("user"))?.email || "",
    },
    theme: {
      color: "#FACC15",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};


  if (!course) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Enroll in {course.title}</h1>
        <p className="text-gray-700 mb-6">{course.description}</p>
        <p className="text-xl font-semibold text-green-600 mb-6">
          Price: ₹{course.price}
        </p>
        <button
          onClick={handlePayment}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg shadow"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
