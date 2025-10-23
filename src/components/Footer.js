// src/components/Footer.js
import React from "react";
import theme from "../theme";

const Footer = () => (
  <footer style={{
    textAlign: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    fontSize: "0.9rem",
    flexShrink: 0, // ensures sticky behavior in flex layout
    boxShadow: "0 -4px 10px rgba(0,0,0,0.05)",
  }}>
    &copy; {new Date().getFullYear()} Sebetsa Africa. All rights reserved.
  </footer>
);

export default Footer;
