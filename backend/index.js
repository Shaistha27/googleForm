const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const { Form } = require("./models/formSchema");
const PORT = 3001;
const app = express();

app.use(express.json());
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    timeout: 30000,
  })
);

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Generate unique file names
  },
});

// Initialize multer without file filter to accept all file types
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Optional: 10MB file size limit
});

// Route to create a new form with validation for radio and checkbox fields
app.post("/forms", async (req, res) => {
  const { title, description, sections } = req.body;

  if (!title || !sections || !Array.isArray(sections)) {
    return res.status(400).json({
      error: "Title and sections are required, and sections should be an array",
    });
  }

  // Validate that `radio` or `checkbox` fields have options
  for (const section of sections) {
    for (const field of section.fields) {
      if (
        (field.fieldType === "radio" || field.fieldType === "checkbox") &&
        !Array.isArray(field.options)
      ) {
        return res.status(400).json({
          error: `Field "${field.label}" requires options to be an array for type ${field.fieldType}.`,
        });
      }
    }
  }

  try {
    const form = new Form({ title, description, sections });
    await form.save();
    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: "Error creating form. Please try again." });
  }
});

// Route to submit a response with validation against allowed options
app.post("/forms/:id/responses", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const { answers } = req.body;

    // Validate each answer against the form's fields
    for (const section of form.sections) {
      for (const field of section.fields) {
        const answer = answers[field._id];

        if (field.fieldType === "radio" || field.fieldType === "checkbox") {
          // Check if answer matches one of the allowed options
          if (!field.options.includes(answer)) {
            return res.status(400).json({
              error: `Invalid answer for field "${
                field.label
              }". Expected one of: ${field.options.join(", ")}`,
            });
          }
        }
      }
    }

    // Save the response if all validations pass
    form.responses.push({ answers });
    await form.save();
    res.status(201).json({ message: "Response submitted successfully" });
  } catch (error) {
    console.error("Error saving response:", error);
    res
      .status(500)
      .json({ error: "Error submitting response. Please try again." });
  }
});

// Route to upload files (accepts any file type)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    filename: req.file.filename,
    message: "File uploaded successfully",
  });
});

// Get a specific form by ID
app.get("/forms/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) return res.status(404).json({ error: "Form not found" });
  res.json(form);
});

// Connect to MongoDB and start server
mongoose
  .connect(
    "mongodb+srv://shaistha:test123@cluster0.9e03u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on ${PORT} and database connected`)
    )
  )
  .catch((err) => console.error("Database connection error:", err));
