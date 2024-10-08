import React, { useState } from "react";
import "../PlaceOrder/QrConfirm.css";
import qrImage from "../../assets/PaymentQR.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const QRConfirm = () => {
  const { token, url } = React.useContext(StoreContext);
  const navigate = useNavigate();

  // State to handle form visibility and user input
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    paymentProof: null, // For file upload
    paymentProofPreview: null, // Preview URL for image
  });

  // Show the form when "Confirm Order" is clicked
  const handleConfirmClick = () => {
    setShowForm(true);
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes (and show preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      paymentProof: file,
      paymentProofPreview: URL.createObjectURL(file), // Preview
    }));
  };

  // Handle final order submission
  const handleFinalOrder = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("paymentProof", formData.paymentProof);

    try {
      // Send form data to the backend, including payment proof
      await axios.post(url + "api/order/confirm", formDataToSend, {
        headers: {
          token,
          "Content-Type": "multipart/form-data", // Necessary for file upload
        },
      });

      // Show toaster on successful confirmation
      toast.success("Placed the order successfully! 🚀");

      // Reset form data after successful order
      setFormData({
        name: "",
        contact: "",
        paymentProof: null,
        paymentProofPreview: null,
      });

      // After successful confirmation, navigate to the success page
      navigate("/success");
    } catch (error) {
      console.error("Error saving final order", error);
      toast.error("Failed to place the order! 😞");
    }
  };

  return (
    <div className="qr-confirm">
      <h1>Scan QR to Confirm Payment</h1>
      <img src={qrImage} alt="QR Code" />

      {!showForm ? (
        <button onClick={handleConfirmClick}>Confirm Order</button>
      ) : (
        <div className="payment-proof-form">
          <h2>Complete Your Order</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
          <h2>Add Payment Proof Image</h2>
          <input
            type="file"
            name="paymentProof"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {/* Show preview of uploaded image */}
          {formData.paymentProofPreview && (
            <img
              src={formData.paymentProofPreview}
              alt="Payment Proof Preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
          <button onClick={handleFinalOrder}>Final Order</button>
        </div>
      )}

      {/* Toaster container */}
      {/* <ToastContainer
        position="top-right" // Set the position to 'top-right'
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={false} // New toasts will not appear on top
        closeOnClick // Allow closing the toast on click
        pauseOnHover // Pause toast when hovered
        draggable // Allow dragging the toast
        theme="colored" // Set theme to 'colored'
      /> */}
    </div>
  );
};

export default QRConfirm;
