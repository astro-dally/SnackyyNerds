import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, snack_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    snack_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };
    let response = await axios.post(url + "api/order/place", orderData, {
      headers: { token },
    });
    navigate("/qr-confirm");
  };

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              type="text"
              placeholder="First name"
              value={data.firstName}
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              type="text"
              placeholder="Last name"
              value={data.lastName}
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            type="email"
            placeholder="Email address"
            value={data.email}
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            type="text"
            placeholder="Street"
            value={data.street}
          />
          <div className="multi-fields">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
              value={data.city}
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
              value={data.state}
            />
          </div>
          <div className="multi-fields">
            <input
              name="zip"
              onChange={onChangeHandler}
              type="text"
              placeholder="Zip code"
              value={data.zip}
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              value={data.country}
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            type="text"
            placeholder="Phone number"
            value={data.phone}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
                </p>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
