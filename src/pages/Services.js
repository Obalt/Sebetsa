import React, { useState, useEffect } from "react";
import theme from "../theme";

const services = [
  {
    title: "Recruitment Solutions",
    description:
      "We connect the right talent with the right opportunity. From permanent placements to fixed-term contracts, we ensure that businesses hire skilled professionals who drive growth.",
  },
  {
    title: "Workforce Management",
    description:
      "We assist businesses with structuring, managing, and optimizing their workforce. This includes compliance, payroll coordination, HR process alignment, and performance monitoring.",
  },
  {
    title: "Advisory & Compliance Support",
    description:
      "Labour laws and compliance can be complex. Sebetsa Africa helps businesses stay aligned with regulations and reduce risk through expert workforce advisory services.",
  },
  {
    title: "Skills Development & Training",
    description:
      "We provide training programs to upskill employees, increase productivity, and prepare workforces for long-term success.",
  },
];

const Services = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main style={{ fontFamily: theme.fonts.main, backgroundColor: theme.colors.background, color: theme.colors.primary, lineHeight: 1.6 }}>
      
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
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          backgroundColor: "rgba(255,255,255,0.85)",
          color: "#000",
          display: "inline-block",
          padding: "1rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
        }}>
          OUR SERVICES
        </h1>
        <p style={{ marginTop: "20px", maxWidth: "600px", margin: "20px auto 0", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.6 }}>
          Sebetsa Africa offers comprehensive workforce solutions designed to help businesses focus on their core operations while we handle the human element.
        </p>
      </section>

      {/* Services List */}
      <section style={{ maxWidth: "1000px", margin: "50px auto", padding: "0 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "35px" }}>Service Offerings</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
        }}>
          {services.map((service, idx) => (
            <div key={idx} style={{
              padding: "25px 20px",
              borderRadius: "12px",
              background: "#f9f9f9",
              borderLeft: `5px solid ${theme.colors.accent}`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
            >
              <strong style={{ display: "block", marginBottom: "10px", fontSize: "1.1rem", color: theme.colors.primary }}>
                {service.title}
              </strong>
              <p style={{ fontSize: "0.95rem", color: theme.colors.text, lineHeight: 1.6 }}>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        textAlign: "center",
        padding: "60px 20px",
        backgroundColor: "#0d1b2a",
        color: "#fff",
        marginTop: "50px",
      }}>
        <h2 style={{ marginBottom: "25px", fontSize: "1.8rem" }}>Ready to Transform Your Workforce?</h2>
        <a
          href="/contact"
          style={{
            backgroundColor: "#e67e22",
            padding: "14px 28px",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.3s ease",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d35400";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#e67e22";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Request a Consultation
        </a>
      </section>

      {/* Back to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#FDD835",
            color: "#1B5E20",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FFC107"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FDD835"}
        >
          &#8679;
        </button>
      )}
    </main>
  );
};

export default Services;
