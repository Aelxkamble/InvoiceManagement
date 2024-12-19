require("dotenv").config();
const express = require("express");
const cors = require("cors");
const invoiceRoutes = require("./routes/invoiceRoutes");
const app = express();
// Use the PORT variable from the .env file or fallback to 5000
const port = process.env.PORT || 5000;

app.use(express.json());
// to parse JSON requests
app.use(cors());

// Default Route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to the Invoice API! Use /api/invoices to interact with the app.",
  });
});

// API Routes
app.use("/api", invoiceRoutes);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
