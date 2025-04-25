import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "";
  const roomfee = location.state?.roomfee || 0;
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    
    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error("Payment Error:", error);
        alert(error.message);
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:3000/api/pay", {
        userName,
        roomfee
      });

      if (response.data.success) {
        alert("✅ Payment Successful!");

        // Update backend with payment status
        await axios.post("http://localhost:3000/api/update-payment-status", {
          userName,
          status: "Paid",
        });

        // Navigate back to Maintenance page with updated status
        navigate("/user-dashboard", { state: { user: { userName, roomfee, status: "Paid" } } });
      } else {
        alert("❌ Payment Failed!");
      }
    } catch (error) {
      console.error("Payment Request Error:", error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Complete Your Payment</h2>

        {/* Card Input */}
        <div className="border rounded-lg p-3 shadow-sm">
          <CardElement className="text-gray-700" />
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          className={`w-full mt-4 py-2 text-white font-semibold rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : `Pay ₹${roomfee}`}
        </button>
      </div>
    </div>
  );
};

export default Payment;