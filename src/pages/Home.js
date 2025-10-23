import React, { useState, useEffect } from "react";
import theme from "../theme";

const servicesData = [
  { title: "Recruitment Solutions", desc: "Finding the right talent for your business." },
  { title: "Workforce Support", desc: "Helping you manage and strengthen teams effectively." },
  { title: "Compliance & Risk Advisory", desc: "Ensuring labour and regulatory compliance." },
  { title: "Training & Upskilling", desc: "Future-ready skills development (coming soon)." },
];

const whyUsData = [
  "One partner for workforce management & recruitment",
  "Scalable and flexible solutions",
  "Compliance-driven, risk-aware",
  "Focused on efficiency, quality & results",
];

const Home = () => {
  const [visibleServices, setVisibleServices] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const services = document.querySelectorAll(".service-card");
      const newVisible = [];
      services.forEach((service, idx) => {
        const rect = service.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) newVisible.push(idx);
      });
      setVisibleServices(newVisible);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      style={{
        fontFamily: theme.fonts.main,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        lineHeight: 1.6,
      }}
    >
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: `linear-gradient(to bottom right, rgba(20,82,20,0.85), rgba(27,94,32,0.85)), url('/assets/images/logo_bg_light.png') center/contain no-repeat`,
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
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            transition: "transform 0.5s ease",
          }}
        >
          Moving People. Powering Africa.
        </h1>
        <p
          style={{
            marginTop: "20px",
            maxWidth: "650px",
            margin: "20px auto 0",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.8,
          }}
        >
          Sebetsa Africa – Your Total Workforce Solutions Partner
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-block",
            marginTop: "20px",
            backgroundColor: "#e67e22",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.3s ease",
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
          Work With Us
        </a>
      </section>

      {/* Intro */}
      <section
        style={{
          maxWidth: "900px",
          margin: "60px auto",
          textAlign: "center",
          padding: "0 20px",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          lineHeight: 1.8,
          opacity: 0,
          transform: "translateY(20px)",
          animation: "fadeInUp 0.8s forwards",
        }}
      >
        <p>
          Sebetsa Africa is a Total Workforce Solutions company helping businesses grow through practical, compliant, and scalable workforce management.
        </p>
      </section>

      {/* Services */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
          maxWidth: "1000px",
          margin: "60px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        {servicesData.map((service, idx) => (
          <div
            key={idx}
            className="service-card"
            style={{
              padding: "25px 20px",
              borderRadius: "12px",
              background: "#f9f9f9",
              border: "2px solid transparent",
              transition: "all 0.4s ease",
              cursor: "pointer",
              transform: visibleServices.includes(idx) ? "translateY(0)" : "translateY(20px)",
              opacity: visibleServices.includes(idx) ? 1 : 0,
              boxShadow: visibleServices.includes(idx) ? "0 8px 18px rgba(0,0,0,0.1)" : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
              e.currentTarget.style.borderColor = theme.colors.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <h3 style={{ marginBottom: "12px", color: theme.colors.primary, fontSize: "1.2rem" }}>
              {service.title}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>{service.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          maxWidth: "700px",
          margin: "60px auto",
          textAlign: "center",
          padding: "0 20px",
          fontSize: "1rem",
          lineHeight: 1.8,
          opacity: 0,
          transform: "translateY(20px)",
          animation: "fadeInUp 0.8s forwards 0.2s",
        }}
      >
        <h2 style={{ marginBottom: "25px", fontSize: "1.8rem" }}>Why Choose Us</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {whyUsData.map((item, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: "12px",
                position: "relative",
                paddingLeft: "25px",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "2px",
                  color: "#27ae60",
                  fontWeight: "bold",
                }}
              >
                ✔
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Section */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "linear-gradient(135deg, #0d1b2a 0%, #1b2d4d 100%)",
          color: "#fff",
        }}
      >
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
            transition: "all 0.4s ease",
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

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default Home;
