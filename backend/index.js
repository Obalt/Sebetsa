require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" }); // temporary folder

// ---------------- SMTP Transport ----------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true, // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP connection failed:", err.message);
  } else {
    console.log("✅ SMTP ready");
  }
});

// ---------------- Helper: Input Sanitization ----------------
const sanitizeInput = (value, maxLength = 100) =>
  value.replace(/<\/?[^>]+(>|$)/g, "").trim().slice(0, maxLength);

const sanitizeMessage = (value) => sanitizeInput(value, 1000);

// ---------------- Routes ----------------

// Contact Form Submission
app.post("/backend/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (
      !name || !email || !phone || !subject || !message ||
      !/^[a-zA-Z\s-]{1,100}$/.test(name) ||
      !/^[a-zA-Z\s-]{1,100}$/.test(subject) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^0\d{9}$/.test(phone) ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid form data." });
    }

    // Sanitize inputs
    const safeName = sanitizeInput(name);
    const safeSubject = sanitizeInput(subject);
    const safeMessage = sanitizeMessage(message);
    const safeEmail = email.trim();
    const safePhone = phone.trim();

    const mailOptions = {
      from: `"${safeName}" <${process.env.SMTP_USER}>`,
      to: process.env.HR_EMAIL,
      subject: `[Contact Form] ${safeSubject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong><br/>${safeMessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// JobSeekers Form Submission
app.post("/backend/apply", upload.single("resume"), async (req, res) => {
  try {
    const { fullname, email, phone, industry, qualification, coverletter } = req.body;
    const resumeFile = req.file;

    if (!fullname || !email || !phone || !industry || !qualification || !resumeFile) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Sanitize
    const safeFullname = sanitizeInput(fullname);
    const safeCover = sanitizeMessage(coverletter || "");

    const mailOptions = {
      from: `"${safeFullname}" <${process.env.SMTP_USER}>`,
      to: process.env.HR_EMAIL,
      subject: `[Job Application] ${safeFullname}`,
      html: `
        <h3>New Job Application</h3>
        <p><strong>Name:</strong> ${safeFullname}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Phone:</strong> ${phone.trim()}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Qualification:</strong> ${qualification}</p>
        <p><strong>Cover Letter:</strong><br/>${safeCover}</p>
      `,
      attachments: [
        {
          filename: resumeFile.originalname,
          path: resumeFile.path,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Delete temporary file
    fs.unlinkSync(resumeFile.path);

    res.json({ success: true, message: "Application submitted successfully." });
  } catch (err) {
    console.error("❌ Job application failed:", err.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Test Email
app.get("/backend/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"Test Email" <${process.env.SMTP_USER}>`,
      to: process.env.HR_EMAIL,
      subject: "✅ Test Email from Backend",
      text: "This is a test email to verify SMTP settings.",
    });
    res.send("✅ Test email sent successfully.");
  } catch (err) {
    console.error("❌ Test email failed:", err.message);
    res.status(500).send("❌ Test email failed: " + err.message);
  }
});

// Serve React Frontend
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
