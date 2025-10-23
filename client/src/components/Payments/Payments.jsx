// src/components/Payments/Payments.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  useEffect(() => {
    if (!course) navigate("/courses");
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
    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay SDK failed to load. Are you online?");

    try {
      // 1️⃣ Create order on backend
      const orderRes = await fetch(`${import.meta.env.VITE_BASE_URI}create_order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ course_id: course.id }),
      });

      const orderData = await orderRes.json();
      if (!orderData.order_id) return alert(orderData.error || "Order creation failed");

      // 2️⃣ Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: "INR",
        name: "BM Academy",
        description: `Enroll in ${course.title}`,
        image: import.meta.env.VITE_BASE_URI + "/logo.png", // HTTPS-safe logo
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            // 3️⃣ Confirm payment on backend
            const confirmRes = await fetch(`${import.meta.env.VITE_BASE_URI}confirm_payment/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const confirmData = await confirmRes.json();

            if (confirmData.message || confirmData.success) {
              alert(confirmData.message || "Payment successful! You are now enrolled.");
            } else {
              alert(confirmData.error || "Payment verification failed.");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            alert("Payment verification failed. Check console for details.");
          }

          navigate("/dashboard/student");
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
        },
        theme: { color: "#FACC15" },
      };

      // 4️⃣ Open Razorpay checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
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
