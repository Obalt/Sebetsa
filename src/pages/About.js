import React, { useState, useEffect } from "react";
import theme from "../theme";

const valuesData = [
  { title: "Integrity", desc: "We operate with transparency and accountability." },
  { title: "Excellence", desc: "Consistently raising the standard." },
  { title: "Partnership", desc: "We build lasting relationships with clients and candidates." },
  { title: "Impact", desc: "We drive meaningful change for businesses, individuals, and communities." },
];

const About = () => {
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
          background: `linear-gradient(rgba(20,82,20,0.85), rgba(20,82,20,0.85)), url('/assets/images/logo_bg_light.png') center/contain no-repeat`,
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
          ABOUT SEBETSA AFRICA
        </h1>
        <p style={{ marginTop: "20px", maxWidth: "600px", margin: "20px auto 0" }}>
          Sebetsa Africa is a trusted workforce solutions partner, dedicated to connecting talent with opportunity while helping businesses strengthen and scale their teams. With an innovative, compliance-driven approach, we deliver solutions that create sustainable impact across Africa.
        </p>
      </section>

      {/* Mission Section */}
      <section style={{ maxWidth: "900px", margin: "50px auto", textAlign: "center", padding: "0 20px" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "15px" }}>Our Mission</h2>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
          To move people and power Africa through innovative workforce solutions.
        </p>
      </section>

      {/* Values Section */}
      <section style={{ maxWidth: "1000px", margin: "50px auto", padding: "0 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "25px" }}>Our Values</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
        }}>
          {valuesData.map((value, idx) => (
            <div key={idx} style={{
              padding: "20px",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.03)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
            >
              <h3 style={{ marginBottom: "10px", color: theme.colors.primary }}>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#0d1b2a", color: "#fff", marginTop: "50px" }}>
        <h2>Ready to Connect With Us?</h2>
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
          onMouseEnter={(e) => e.target.style.backgroundColor = "#d35400"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#e67e22"}
        >
          Request a Consultation
        </a>
      </section>

      {/* Back to Top Button */}
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

export default About;
