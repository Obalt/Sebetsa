// src/components/BackToTopButton.js
import React, { useState, useEffect } from "react";
import theme from "../theme";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          backgroundColor: theme.colors.secondary,
          color: theme.colors.primary,
          fontSize: "1.5rem",
          zIndex: 100,
        }}
      >
        ↑
      </button>
    )
  );
};

export default BackToTopButton;
