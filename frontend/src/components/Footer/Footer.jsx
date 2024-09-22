import React, { useState, useEffect } from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa"; // Importing necessary icons
import logo from "../../assets/LOGO.jpeg";
import { PiXLogoFill } from "react-icons/pi";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of the "up arrow" button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll to the "Explore Menu" section
  const scrollToExploreMenu = () => {
    const exploreMenuSection = document.getElementById("explore-menu");
    if (exploreMenuSection) {
      exploreMenuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="footer">
      <hr className="hr" />
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="Snacky Nerds Logo" />
          <p>
            Fuel your passion with tech and snacks! Have fun and amazing snacks
            with your friends.
          </p>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=61565909080253"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="footer-social-icon" />
            </a>
            <a
              href="https://x.com/snackyynerds"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PiXLogoFill className="footer-social-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/snackyy-nerds"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="footer-social-icon" />
            </a>
            <a
              href="https://www.instagram.com/snackyy__nerdss/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="footer-social-icon" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li onClick={scrollToTop}>Home</li>
            <li onClick={scrollToExploreMenu}>About us</li>
            {/* <li>Delivery</li>
            <li>Privacy policy</li> */}
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>
              <FaPhone className="footer-icon" /> +91 9344813532
            </li>
            <li>
              <FaEnvelope className="footer-icon" /> snackyynerds@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">
        Copyright © 2024 Snacky Nerds. All rights reserved.
      </p>

      {/* Up Arrow Button */}
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp className="arrow-up-icon" />
          <div className="tooltip">Move to Top</div> {/* Tooltip text */}
        </div>
      )}
    </div>
  );
};

export default Footer;
