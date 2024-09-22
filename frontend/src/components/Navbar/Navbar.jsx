import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/LOGO.jpeg";
// import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { snack_list } from "../../assets/assets"; // Assuming snack data is imported
import { IoLogOut } from "react-icons/io5";
import profile from "../../assets/icons/profile_iconn.webp";
// import bag from "../../assets/icons/bag_icon.png";
import { IoBagOutline } from "react-icons/io5";
// import logoutt from "../../assets/icons/logout_icon.png";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleSearchBar = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = snack_list.filter(
        (snack) =>
          snack.name.toLowerCase().includes(query) ||
          snack.category.toLowerCase() === query ||
          (query === "snacks" && snack.category)
      );

      console.log("Filtered Results:", results); // Log for debugging
      setSearchResults(results);
      setSearchQuery("");
      toggleSearchBar();
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Snacky Nerds Logo" className="logo" />
      </Link>
      <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/">
          <li
            onClick={() => {
              setMenu("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={menu === "home" ? "active" : ""}
          >
            home
          </li>
        </Link>
        <li
          onClick={() => {
            setMenu("menu");
            document
              .getElementById("explore-menu")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </li>
        <li
          onClick={() => {
            setMenu("contact us");
            document
              .querySelector(".footer")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </li>
      </ul>
      <div className="navbar-right">
        {/* {isSearchOpen ? (
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="search-input"
              autoFocus
            />
            <button type="submit" className="search-submit">
              Go
            </button>
          </form>
        ) : (
          <FiSearch className="searchicon" onClick={toggleSearchBar} />
        )} */}
        <div className="cart">
          <Link to="/cart">
            <IoCartOutline className="carticon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="signinbutton">
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={profile} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <IoBagOutline className="bag" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <IoLogOut className="log" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </div>

      {isMobileMenuOpen && (
        <ul className="mobile-menu">
          <li
            onClick={() => {
              setMenu("home");
              toggleMobileMenu();
            }}
            className={menu === "home" ? "active" : ""}
          >
            home
          </li>
          <li
            onClick={() => {
              setMenu("menu");
              document
                .getElementById("explore-menu")
                ?.scrollIntoView({ behavior: "smooth" });
              toggleMobileMenu();
            }}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </li>
          <li
            onClick={() => {
              setMenu("contact us");
              document
                .querySelector(".footer")
                ?.scrollIntoView({ behavior: "smooth" });
              toggleMobileMenu();
            }}
            className={menu === "contact us" ? "active" : ""}
          >
            contact us
          </li>
        </ul>
      )}

      {/* {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((snack) => (
              <li key={snack._id}>
                <img src={snack.image} alt={snack.name} />
                <div>{snack.name}</div>
                <div>{snack.price} USD</div>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};
