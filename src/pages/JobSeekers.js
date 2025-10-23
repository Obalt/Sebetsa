// client/src/pages/JobSeekers.js
import React, { useState } from "react";
import theme from "../theme";

const JobSeekers = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    industry: "",
    qualification: "",
    applicationRef: "", // <-- new optional field
    coverletter: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submissions, setSubmissions] = useState(() => {
    const stored = sessionStorage.getItem("jobSubmissions");
    return stored ? JSON.parse(stored) : {};
  });

  const [submitting, setSubmitting] = useState(false);

  // Strict sanitization
  const sanitizeInput = (value) => value.replace(/<\/?[^>]+(>|$)/g, "").trim().slice(0, 100);
  const sanitizeCover = (value) => value.replace(/<\/?[^>]+(>|$)/g, "").trim().slice(0, 1000);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume" && files?.[0]) {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) return alert("❌ Only PDF or DOC/DOCX allowed.");
      if (file.size > 5 * 1024 * 1024) return alert("❌ Max file size: 5MB.");
      setFormData({ ...formData, resume: file });
      setErrors({ ...errors, resume: "" });
      return;
    }

    let sanitizedValue = typeof value === "string" ? value.replace(/[<>]/g, "") : value;

    if (name === "phone") sanitizedValue = sanitizedValue.replace(/\D/g, "").slice(0, 10);

    setFormData({ ...formData, [name]: sanitizedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const validateText = (value) => /^[a-zA-Z\s-]{1,100}$/.test(value);
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value) => /^0\d{9}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const { fullname, email, phone, industry, qualification, applicationRef, coverletter, resume } = formData;

    const newErrors = {};
    if (!validateText(fullname)) newErrors.fullname = "Only letters, spaces, hyphens (max 100).";
    if (!validateEmail(email)) newErrors.email = "Invalid email.";
    if (!validatePhone(phone)) newErrors.phone = "Phone must be 10 digits, starting with 0.";
    if (!industry) newErrors.industry = "Select an industry.";
    if (!qualification) newErrors.qualification = "Select a qualification.";
    if (!resume) newErrors.resume = "Resume is required.";

    // Duplicate submission inline errors
    if (submissions[email]) newErrors.email = "❌ This email has already submitted an application.";
    if (submissions[phone]) newErrors.phone = "❌ This phone has already submitted an application.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    const formPayload = new FormData();
    formPayload.append("fullname", sanitizeInput(fullname));
    formPayload.append("email", email.trim());
    formPayload.append("phone", phone.trim());
    formPayload.append("industry", industry);
    formPayload.append("qualification", qualification);
    if (applicationRef.trim()) formPayload.append("applicationRef", sanitizeInput(applicationRef)); // <-- optional field
    formPayload.append("coverletter", sanitizeCover(coverletter));
    formPayload.append("resume", resume);

    try {
      const res = await fetch("/backend/apply", {
        method: "POST",
        body: formPayload,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const updatedSubmissions = { ...submissions, [email]: true, [phone]: true };
        setSubmissions(updatedSubmissions);
        sessionStorage.setItem("jobSubmissions", JSON.stringify(updatedSubmissions));

        setSuccessMessage("✅ Application submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 10000);

        setFormData({
          fullname: "",
          email: "",
          phone: "",
          industry: "",
          qualification: "",
          applicationRef: "", // reset optional field
          coverletter: "",
          resume: null,
        });
        setErrors({});
      } else {
        alert(data.error || "Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
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
          Job Seekers Application
        </h1>
        <p style={{ marginTop: "20px", maxWidth: "600px", margin: "20px auto 0" }}>
          Apply to Sebetsa Africa. <strong>All fields marked * are required.</strong>
        </p>
        <a
          href="#jobForm"
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
          Apply Now
        </a>
      </section>

      {/* Form Section */}
      <section
        id="jobForm"
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
          Submit Your Application
        </h2>

        <form style={{ display: "flex", flexDirection: "column", gap: theme.spacing.md }} onSubmit={handleSubmit}>
          {/* Fields */}
          {[
            { name: "fullname", type: "text", label: "Full Name" },
            { name: "email", type: "email", label: "Email" },
            { name: "phone", type: "tel", label: "Phone" },
            {
              name: "industry",
              type: "select",
              label: "Industry",
              options: ["Logistics", "Finance", "IT", "Engineering", "HR", "Marketing", "Other"],
            },
            {
              name: "qualification",
              type: "select",
              label: "Qualification",
              options: ["Matric","Certificate/Diploma","Bachelors","Honours","Masters","PhD"],
            },
            { name: "applicationRef", type: "text", label: "Application Reference", required: false }, // <-- new
          ].map((field, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required !== false}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "16px 12px",
                    borderRadius: "8px",
                    border: `2px solid ${errors[field.name] ? "#e74c3c" : theme.colors.accent}`,
                    fontSize: "1rem",
                    outline: "none",
                    appearance: "none",
                    transition: "border 0.3s, box-shadow 0.3s, transform 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#d35400";
                    e.currentTarget.style.boxShadow = "0 0 8px rgba(211,84,0,0.5)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors[field.name] ? "#e74c3c" : theme.colors.accent;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <option value="">-- Select {field.label} --</option>
                  {field.options?.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required !== false}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "16px 12px",
                    borderRadius: "8px",
                    border: `2px solid ${errors[field.name] ? "#e74c3c" : theme.colors.accent}`,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border 0.3s, box-shadow 0.3s, transform 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#d35400";
                    e.currentTarget.style.boxShadow = "0 0 8px rgba(211,84,0,0.5)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors[field.name] ? "#e74c3c" : theme.colors.accent;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              )}
              <label
                style={{
                  position: "absolute",
                  left: "12px",
                  top: formData[field.name] ? "-10px" : "16px",
                  fontSize: formData[field.name] ? "0.8rem" : "1rem",
                  color: theme.colors.primary,
                  backgroundColor: "#fff",
                  padding: "0 4px",
                  transition: "0.3s",
                  pointerEvents: "none",
                }}
              >
                {field.label} {field.required !== false && "*"}
              </label>
              {errors[field.name] && (
                <p style={{ color: "#e74c3c", marginTop: "4px", fontSize: "0.85rem" }}>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* Cover Letter */}
          <div style={{ position: "relative" }}>
            <textarea
              name="coverletter"
              rows="5"
              value={formData.coverletter}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "16px 12px",
                borderRadius: "8px",
                border: `2px solid ${errors.coverletter ? "#e74c3c" : theme.colors.accent}`,
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.3s, box-shadow 0.3s, transform 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#d35400";
                e.currentTarget.style.boxShadow = "0 0 8px rgba(211,84,0,0.5)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.coverletter ? "#e74c3c" : theme.colors.accent;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <label
              style={{
                position: "absolute",
                left: "12px",
                top: formData.coverletter ? "-10px" : "16px",
                fontSize: formData.coverletter ? "0.8rem" : "1rem",
                color: theme.colors.primary,
                backgroundColor: "#fff",
                padding: "0 4px",
                transition: "0.3s",
              }}
            >
              Cover Letter / Short Bio
            </label>
          </div>

          {/* Resume Upload */}
          <div
            style={{
              border: "2px dashed #ccc",
              padding: "16px",
              borderRadius: "8px",
              transition: "background-color 0.3s, border-color 0.3s",
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.backgroundColor = "#f9f9f9";
              e.currentTarget.style.borderColor = "#d35400";
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#ccc";
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#ccc";
              if (e.dataTransfer.files?.[0]) {
                handleChange({ target: { name: "resume", files: e.dataTransfer.files } });
              }
            }}
          >
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Upload Resume (PDF/DOC, max 5MB)
            </label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} />
            {formData.resume && (
              <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#27ae60" }}>
                📄 {formData.resume.name} ({(formData.resume.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            {errors.resume && <p style={{ color: "#e74c3c", fontSize: "0.85rem" }}>{errors.resume}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: submitting ? "#95a5a6" : theme.colors.accent,
              color: "#fff",
              padding: "14px 0",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: submitting ? "not-allowed" : "pointer",
              fontSize: "1rem",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              if (!submitting) {
                e.currentTarget.style.backgroundColor = "#d35400";
                e.currentTarget.style.transform = "scale(1.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!submitting) {
                e.currentTarget.style.backgroundColor = theme.colors.accent;
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default JobSeekers;
