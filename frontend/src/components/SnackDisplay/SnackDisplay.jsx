import React, { useContext, useState, useEffect } from "react";
import "./SnackDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import SnackItem from "../SnackItem/SnackItem";
import { Link } from "react-router-dom";

const SnackDisplay = ({ category }) => {
  const { snack_list } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  // Simulating snack loading
  useEffect(() => {
    const loadSnacks = setTimeout(() => {
      setLoading(false);
    }, 9000); // simulates loading time

    return () => clearTimeout(loadSnacks);
  }, []);

  if (loading) {
    return (
      <div className="snack-loader">
        <div className="spinner"></div>
        <p className="funky-text">Loading Snacks... Let's Get Snacky! 🍿😎</p>
      </div>
    );
  }

  return (
    <div className="snack-display" id="techies-favorites">
      <h1>Techies Favourite Snacks</h1>
      <Link to="#techies-favorites" className="favorites-link"></Link>
      <div className="snack-display-list">
        {snack_list.map((item, index) =>
          category === "All" || category === item.category ? (
            <SnackItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default SnackDisplay;
