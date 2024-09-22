import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000/";
  const [token, setToken] = useState("");
  const [snack_list, setSnack_list] = useState([]);

  // Add an item to the cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = snack_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        } else {
          console.warn(`Item with ID ${itemId} not found in snack list.`);
        }
      }
    }
    return totalAmount;
  };

  const fetchSnackList = async () => {
    try {
      const response = await axios.get(url + "api/snack/list");
      setSnack_list(response.data.data);
    } catch (error) {
      console.error("Error fetching snack list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "api/cart/get",
        {},
        { headers: { token } }
      );
      console.log("Cart data from backend:", response.data.cartData); // Debug log

      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); // First, set the token
        await loadCartData(storedToken); // Then, load the cart data
      }
      await fetchSnackList(); // Fetch snack list regardless
    }
    loadData();
  }, []);

  // Ensure cart is fetched again when token changes
  useEffect(() => {
    if (token) {
      loadCartData(token);
      localStorage.setItem("token", token); // Sync token to localStorage
    }
  }, [token]);

  const contextValue = {
    snack_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
