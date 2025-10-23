import React, { useState, useEffect } from "react";
import theme from "../theme";

const steps = [
  {
    title: "Step 1: Consultation",
    description:
      "We start with a detailed consultation to understand your business needs, challenges, and workforce requirements.",
  },
  {
    title: "Step 2: Workforce Assessment",
    description:
      "For existing clients, we review current workforce structures, contracts, compliance, and HR systems to identify gaps and areas for improvement.",
  },
  {
    title: "Step 3: Tailored Solutions",
    description:
      "Based on your needs, we provide customized workforce solutions, which may include recruitment, training, compliance alignment, or process optimization.",
  },
  {
    title: "Step 4: Ongoing Support",
    description:
      "Our partnership doesn’t end at placement or consultation. We provide continuous support to ensure that your workforce remains efficient, compliant, and aligned with business goals.",
  },
];

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll(".step-card");
      const newVisible = [];
      stepElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) newVisible.push(idx);
      });
      setVisibleSteps(newVisible);
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
        style={{
          textAlign: "center",
          padding: "90px 20px",
          background: `linear-gradient(to bottom right, rgba(20,82,20,0.85), rgba(27,94,32,0.85)), url('/assets/images/logo_bg_light.png') center/contain no-repeat`,
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
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
            marginBottom: "20px",
          }}
        >
          How It Works
        </h1>
        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.8,
          }}
        >
          Whether you need new hires or want to optimize your existing workforce,
          Sebetsa Africa follows a simple but effective process to deliver results.
        </p>
      </section>

      {/* Steps Section */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "60px auto",
          padding: "0 20px",
        }}
      >
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {steps.map((step, idx) => (
            <li
              key={idx}
              className="step-card"
              style={{
                background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                borderRadius: "16px",
                padding: "25px 20px",
                boxShadow: visibleSteps.includes(idx)
                  ? "0 12px 28px rgba(0,0,0,0.15)"
                  : "0 4px 12px rgba(0,0,0,0.05)",
                opacity: visibleSteps.includes(idx) ? 1 : 0,
                transform: visibleSteps.includes(idx)
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                borderTop: `5px solid ${theme.colors.accent}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 18px 35px rgba(0,0,0,0.18)";
                e.currentTarget.style.borderTop = `5px solid ${theme.colors.primary}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(0,0,0,0.15)";
                e.currentTarget.style.borderTop = `5px solid ${theme.colors.accent}`;
              }}
            >
              <h3
                style={{
                  color: theme.colors.primary,
                  fontSize: "1.35rem",
                  marginBottom: "12px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: theme.colors.text,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </p>
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
          marginTop: "60px",
        }}
      >
        <h2 style={{ marginBottom: "25px", fontSize: "1.8rem" }}>
          Ready to Transform Your Workforce?
        </h2>
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
    </main>
  );
};

export default HowItWorks;
