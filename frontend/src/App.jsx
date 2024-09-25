import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import QRConfirm from "./pages/PlaceOrder/QrConfirm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/qr-confirm" element={<QRConfirm />} />
        </Routes>
        <div>
          <ToastContainer
            position="top-right" // Set the position to 'top-right'
            autoClose={5000} // Auto close after 5 seconds
            hideProgressBar={false} // Show the progress bar
            newestOnTop={false} // New toasts will not appear on top
            closeOnClick // Allow closing the toast on click
            pauseOnHover // Pause toast when hovered
            draggable // Allow dragging the toast
            theme="colored" // Set theme to 'colored'
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
