const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ DIRECT MONGODB URI (NO .env)
const MONGO_URI =
  "mongodb+srv://ajaykumar:ajaykumar@cluster0.jv2lix9.mongodb.net/portfolioDB";


// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Schema + Model
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/api/contact", async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving message" });
  }
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});