// src/components/Payments/Payments.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api";

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {}; // course must be passed via state

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login"); // redirect if not logged in
    if (!course) navigate("/courses"); // redirect if no course selected
  }, [course, token, navigate]);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

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
      handler: async function (response) {
        console.log("Payment Success:", response);

        try {
          const payload = {
            course: course.id,
            payment_id: response.razorpay_payment_id,
          };

          console.log("Sending enrollment payload:", payload);
          console.log("Token used:", token);

          const backendRes = await API.post("enrollments/", payload, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Backend enrollment response:", backendRes.data);
          alert("Payment successful! You are now enrolled.");

          navigate("/dashboard/student", { state: { newCourse: course } });
        } catch (err) {
          console.error(
            "Enrollment failed:",
            err.response?.data || err.message || err
          );
          const backendError =
            err.response?.data?.detail ||
            err.response?.data ||
            err.message ||
            "Unknown error";
          alert(`Payment succeeded but enrollment failed: ${backendError}`);
        }
      },
      prefill: {
        name: course.user_name || "",
        email: course.user_email || "",
      },
      theme: { color: "#FACC15" },
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
