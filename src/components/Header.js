// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/jobseekers", label: "Job Seekers" },
    { path: "/contact", label: "Contact" },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animate loading bar on route change
  useEffect(() => {
    setLoadingVisible(true);
    setLoadingProgress(0);
    let interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = Math.min(prev + Math.random() * 15, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingVisible(false), 300);
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <header className="site-header">
      {/* Loading Bar */}
      {loadingVisible && (
        <div
          className="loading-bar"
          style={{
            width: `${loadingProgress}%`,
            height: "4px",
            backgroundColor: "#FDD835",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2000,
            transition: "width 0.2s ease, opacity 0.3s ease",
            opacity: loadingProgress >= 100 ? 0 : 1,
          }}
        ></div>
      )}

      <div className="header-inner">
        {/* Logo */}
        <NavLink to="/" className="logo-outer">
          <img src={logo} alt="Sebetsa Africa" />
        </NavLink>

        {/* Menu Button & Dropdown */}
        <div className="menu-wrapper" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hamburger"
            aria-label="Toggle menu"
          >
            ☰ Menu
          </button>

          {isOpen && (
            <ul className="dropdown-menu animate-dropdown">
              {menuItems.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Movable Yellow Line */}
      <div className="yellow-line animate-line"></div>

      <style>{`
        /* Header Wrapper */
        .site-header {
          background-color: #f3efe6;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          position: relative;
          height: 100px;
        }

        .header-inner {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px;
          height: 100%;
        }

        /* Logo */
        .logo-outer {
          position: absolute;
          top: 10px;
          left: 20px;
          z-index: 1100;
        }

        .logo-outer img {
          height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
          margin: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 8px;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .logo-outer img:hover {
          transform: scale(1.05) rotate(-1deg);
          filter: drop-shadow(0 4px 10px rgba(253,216,53,0.5));
        }

        /* Movable Yellow Line */
        .yellow-line {
          position: absolute;
          top: 98px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #FDD835;
          z-index: 1050;
        }

        .animate-line {
          animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scaleX(1); opacity: 1; }
          50% { transform: scaleX(1.05); opacity: 0.7; }
        }

        /* Menu Button */
        .menu-wrapper {
          position: absolute;
          top: 30px;
          right: 20px;
          display: inline-block;
        }

        .hamburger {
          background: #FDD835;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          color: #1B5E20;
          padding: 8px 16px;
          border-radius: 6px;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .hamburger:hover {
          background: #FFE54F;
          transform: scale(1.05);
        }

        .hamburger:active {
          transform: scale(0.95);
        }

        /* Dropdown Menu */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          list-style: none;
          padding: 10px 0;
          margin: 0;
          min-width: 160px;
          z-index: 1100;
        }

        .dropdown-menu li {
          padding: 8px 20px;
        }

        .dropdown-menu li a {
          text-decoration: none;
          color: #1B5E20;
          font-weight: 700;
          display: block;
        }

        .dropdown-menu li a:hover {
          color: #FDD835;
        }

        .animate-dropdown {
          animation: fadeSlide 0.3s ease forwards;
        }

        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .header-inner {
            flex-direction: column;
            align-items: center;
          }
          .yellow-line {
            top: 90px;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
