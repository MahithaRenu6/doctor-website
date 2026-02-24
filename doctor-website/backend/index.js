const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// TEMP: allow ALL origins (safe for testing)
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
