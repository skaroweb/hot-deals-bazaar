import React, { useState, useEffect } from "react";
import "./BackToTopButton.css"; // You can create a CSS file for styling

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  // Add a scroll event listener to show/hide the button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button className="back-to-top-button" onClick={scrollToTop}>
          <i className="fa fa-angle-up"></i>
        </button>
      )}
    </>
  );
}

export default BackToTopButton;
