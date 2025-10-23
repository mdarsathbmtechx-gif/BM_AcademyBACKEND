// src/components/Payments/Payments.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  useEffect(() => {
    if (!course) {
      navigate("/courses");
    }
  }, [course, navigate]);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!course) return;

    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay SDK failed to load. Are you online?");

    try {
      // 1️⃣ Create order from backend
      const orderRes = await fetch(
        `${import.meta.env.VITE_BASE_URI}courses/create_order/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ course_id: course.id }),
        }
      );

      if (!orderRes.ok) {
        const errText = await orderRes.text();
        throw new Error(`HTTP ${orderRes.status}: ${errText}`);
      }

      const orderData = await orderRes.json();

      // 2️⃣ Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "BM Academy",
        description: `Enroll in ${course.title}`,
        image: "/logo.png",
        order_id: orderData.order_id,
        handler: async function (response) {
          console.log("Payment Success:", response);

          try {
            // 3️⃣ Confirm payment and enroll course
            const confirmRes = await fetch(
              `${import.meta.env.VITE_BASE_URI}courses/confirm_payment/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            if (!confirmRes.ok) {
              const errText = await confirmRes.text();
              throw new Error(`HTTP ${confirmRes.status}: ${errText}`);
            }

            const data = await confirmRes.json();
            if (data.message) {
              alert("Payment successful! You are now enrolled.");
            } else {
              alert("Enrollment failed. Check console for details.");
              console.error(data);
            }
          } catch (err) {
            console.error("Payment confirmation error:", err);
            alert(
              "Enrollment failed. Check console for details (CORS, token, or network issue)."
            );
          }

          navigate("/dashboard/student");
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
        },
        theme: { color: "#FACC15" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Create order error:", err);
      alert("Payment initiation failed. Check console for details.");
    }
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
