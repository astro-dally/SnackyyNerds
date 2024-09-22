import React, { useContext } from "react";
import "./SnackItem.css";
import { MdAddCircleOutline, MdOutlineRemoveCircle } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";

const SnackItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="snack-item">
      <div className="snack-item-img-container">
        <img
          className="snack-item-img"
          src={url + "images/" + image}
          alt={name}
        />
        {!cartItems[id] ? (
          <IoIosAddCircle className="add" onClick={() => addToCart(id)} />
        ) : (
          <div className="snack-item-counter">
            <MdOutlineRemoveCircle
              className="remove"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <IoIosAddCircle
              className="add_button"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="snack-item-info">
        <div className="snack-item-name">
          <p>{name}</p>
        </div>
        <p className="snack-item-desc">{description}</p>
        <p className="snack-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default SnackItem;
