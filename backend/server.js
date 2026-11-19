const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const casesRouter = require("./routes/cases");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ONLINE",
    service: "CASE: TIME TO FIND API",
    timestamp: new Date().toISOString()
  });
});

// Case investigation REST routes
app.use("/api/cases", casesRouter);

// Serve Vite production build (../dist) if available
const distPath = path.join(__dirname, "..", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Keep direct browser requests from returning "Cannot GET /".
// In development, Vite serves the frontend; in production, serve dist/index.html.
app.get("/", (req, res) => {
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  res.json({
    status: "ONLINE",
    service: "CASE: TIME TO FIND API",
    frontend: "Run the Vite dev server at http://localhost:5173",
    health: "/api/health"
  });
});

app.listen(PORT, () => {
  console.log("==================================================");
  console.log("CASE: TIME TO FIND — Backend Server Running");
  console.log(`API Endpoint : http://localhost:${PORT}/api/cases`);
  console.log("==================================================");
});
