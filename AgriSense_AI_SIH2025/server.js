const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Static File Serving (Best Practice) ---
// Explicitly serve only the folders that contain public assets.
// This is more secure than serving the entire root directory.
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// --- Page Routing ---

// ✅ Default route -> Serves the main index.html from the project root.
// You should place your landing page content into this 'index.html' file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Dynamic route handler for all other pages in the '/pages' directory.
// This part is well-written and efficient. No changes needed here.
app.get("/:page", (req, res) => {
  const page = req.params.page.toLowerCase();
  
  // Security: Prevent directory traversal attacks
  if (page.includes('.') || page.includes('/')) {
      return res.status(400).send("Invalid page name.");
  }

  const filePath = path.join(__dirname, "pages", `${page}.html`);

  res.sendFile(filePath, (err) => {
    if (err) {
      // Send a user-friendly 404 page if you have one, otherwise just text.
      res.status(404).send("404 - Page Not Found");
    }
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});