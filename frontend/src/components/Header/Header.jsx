import React from "react";
import "./Header.css";

const Header = () => {
  // Function to scroll to the "Techies Favourite Snacks" section
  const scrollToFavorites = () => {
    const targetSection = document.getElementById("techies-favorites");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h3>Friends, Snacks and Tech!</h3>
        <button onClick={scrollToFavorites}>Lets Snack Nerds</button>
      </div>
    </div>
  );
};

export default Header;
