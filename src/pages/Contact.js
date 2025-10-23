// src/pages/Contact.js
import React, { useState, useEffect } from "react";
import theme from "../theme";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submissions, setSubmissions] = useState(() => {
    // Track previous submissions per session
    const stored = sessionStorage.getItem("submissions");
    return stored ? JSON.parse(stored) : {};
  });

  // Strict input sanitization
  const sanitizeInput = (value) => value.replace(/<\/?[^>]+(>|$)/g, "").trim().slice(0, 100);
  const sanitizeMessage = (value) => value.replace(/<\/?[^>]+(>|$)/g, "").trim().slice(0, 1000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData({ ...formData, phone: digitsOnly.slice(0, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validateText = (value) => /^[a-zA-Z\s-]{1,100}$/.test(value);
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value) => /^0\d{9}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;
    const newErrors = {};

    if (!validateText(name)) newErrors.name = "Only letters, spaces, or hyphens allowed (max 100).";
    if (!validateText(subject)) newErrors.subject = "Only letters, spaces, or hyphens allowed (max 100).";
    if (!validateEmail(email)) newErrors.email = "Invalid email address.";
    if (!validatePhone(phone)) newErrors.phone = "Phone must be exactly 10 digits, starting with 0.";
    if (!message.trim()) newErrors.message = "Message cannot be empty.";

    // Check for previous submissions
    if (submissions[email] || submissions[phone]) {
      newErrors.email = "This email or phone has already submitted a message.";
      newErrors.phone = "This email or phone has already submitted a message.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const safeName = sanitizeInput(name);
    const safeSubject = sanitizeInput(subject);
    const safeMessage = sanitizeMessage(message);
    const safeEmail = email.trim();
    const safePhone = phone.trim();

    // ✅ Send data to backend
    try {
      const response = await fetch("/backend/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: safeName, email: safeEmail, phone: safePhone, subject: safeSubject, message: safeMessage }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("✅ Message sent successfully!");
        // Mark as submitted
        const updatedSubmissions = { ...submissions, [safeEmail]: true, [safePhone]: true };
        setSubmissions(updatedSubmissions);
        sessionStorage.setItem("submissions", JSON.stringify(updatedSubmissions));
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setErrors({});
        setTimeout(() => setSuccessMessage(""), 10000);
      } else {
        setErrors({ form: result.error || "An error occurred. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: "Server error. Please try again." });
    }
  };

  return (
    <main
      style={{
        fontFamily: theme.fonts.main,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        lineHeight: 1.6,
        position: "relative",
      }}
    >
      {/* Toast Success Message */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: theme.colors.accent,
            color: "#fff",
            padding: "16px 24px",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            fontWeight: "600",
            zIndex: 9999,
            animation: "fadeInOut 10s ease-in-out",
          }}
        >
          {successMessage}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
          }
        `}
      </style>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: `linear-gradient(rgba(27,94,32,0.85), rgba(27,94,32,0.85)), url('/assets/images/logo_bg_light.png') center/contain no-repeat`,
          textAlign: "center",
          padding: "90px 20px",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            backgroundColor: "rgba(255,255,255,0.85)",
            color: "#000",
            display: "inline-block",
            padding: "1rem 2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
          }}
        >
          Contact Sebetsa Africa
        </h1>
        <p style={{ marginTop: "20px", maxWidth: "600px", margin: "20px auto 0" }}>
          Reach out for tailored workforce solutions. <strong>All fields are compulsory.</strong>
        </p>
        <a
          href="#contactForm"
          style={{
            display: "inline-block",
            marginTop: "20px",
            backgroundColor: "#e67e22",
            color: "#fff",
            padding: "12px 25px",
            borderRadius: "6px",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#d35400")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e67e22")}
        >
          Send a Message
        </a>
      </section>

      {/* Contact Form Section */}
      <section
        id="contactForm"
        style={{
          maxWidth: "800px",
          margin: "50px auto",
          background: "#ffffff",
          padding: theme.spacing.lg,
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: theme.colors.accent,
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: theme.spacing.md,
            textAlign: "center",
          }}
        >
          Get in Touch
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: theme.spacing.md }}
        >
          {["name", "email", "phone", "subject"].map((field) => (
            <div key={field} style={{ position: "relative" }}>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                name={field}
                id={field}
                required
                maxLength={field === "phone" ? 10 : 100}
                value={formData[field]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "16px 12px",
                  borderRadius: "8px",
                  border: `2px solid ${errors[field] ? "#e74c3c" : theme.colors.accent}`,
                  outline: "none",
                  transition: "border 0.3s, box-shadow 0.3s, transform 0.2s",
                  fontSize: "1rem",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d35400";
                  e.currentTarget.style.boxShadow = "0 0 8px rgba(211,84,0,0.5)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors[field] ? "#e74c3c" : theme.colors.accent;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <label
                htmlFor={field}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: formData[field] ? "-10px" : "16px",
                  fontSize: formData[field] ? "0.8rem" : "1rem",
                  color: theme.colors.primary,
                  backgroundColor: "#fff",
                  padding: "0 4px",
                  transition: "0.3s",
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              {errors[field] && (
                <p style={{ color: "#e74c3c", marginTop: "4px", fontSize: "0.85rem" }}>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <div style={{ position: "relative" }}>
            <textarea
              name="message"
              id="message"
              required
              rows="5"
              maxLength={1000}
              value={formData.message}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "16px 12px",
                borderRadius: "8px",
                border: `2px solid ${errors.message ? "#e74c3c" : theme.colors.accent}`,
                outline: "none",
                transition: "border 0.3s, box-shadow 0.3s, transform 0.2s",
                fontSize: "1rem",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#d35400";
                e.currentTarget.style.boxShadow = "0 0 8px rgba(211,84,0,0.5)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.message ? "#e74c3c" : theme.colors.accent;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <label
              htmlFor="message"
              style={{
                position: "absolute",
                left: "12px",
                top: formData.message ? "-10px" : "16px",
                fontSize: formData.message ? "0.8rem" : "1rem",
                color: theme.colors.primary,
                backgroundColor: "#fff",
                padding: "0 4px",
                transition: "0.3s",
              }}
            >
              Message *
            </label>
            {errors.message && (
              <p style={{ color: "#e74c3c", marginTop: "4px", fontSize: "0.85rem" }}>
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: theme.colors.accent,
              color: "#fff",
              padding: "14px 0",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d35400";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.accent;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Submit
          </button>

          {/* Form-level error */}
          {errors.form && (
            <p style={{ color: "#e74c3c", marginTop: "8px", fontWeight: "600", textAlign: "center" }}>
              {errors.form}
            </p>
          )}
        </form>
      </section>

      {/* CTA Section */}
      <section
        style={{
          textAlign: "center",
          padding: "40px 20px",
          backgroundColor: "#0d1b2a",
          color: "#fff",
          marginTop: "50px",
        }}
      >
        <h2>Ready to Transform Your Workforce?</h2>
        <a
          href="/contact"
          style={{
            backgroundColor: "#e67e22",
            padding: "12px 25px",
            borderRadius: "6px",
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#d35400")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e67e22")}
        >
          Request a Consultation
        </a>
      </section>
    </main>
  );
};

export default Contact;
