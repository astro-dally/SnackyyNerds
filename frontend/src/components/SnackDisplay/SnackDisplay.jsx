import React, { useContext } from "react";
import "./SnackDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import SnackItem from "../SnackItem/SnackItem";
import { Link } from "react-router-dom";

const SnackDisplay = ({ category }) => {
  const { snack_list } = useContext(StoreContext);

  return (
    <div className="snack-display" id="techies-favorites">
      <h1>Techies Favourite Snacks</h1>
      <Link to="#techies-favorites" className="favorites-link">
        See Techies' Favourites
      </Link>
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
