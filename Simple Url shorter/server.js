const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Initialize SQLite
const db = new sqlite3.Database("urls.db", (err) => {
  if (err) return console.error("DB Error:", err.message);
  db.run(
    "CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, short TEXT UNIQUE)"
  );
});

// Generate random short code
function generateShortCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API: Create short URL
app.post("/api/shorten", (req, res) => {
  const url = req.body.url;
  const shortCode = generateShortCode();

  db.run(
    "INSERT INTO urls (url, short) VALUES (?, ?)",
    [url, shortCode],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Something went wrong.");
      }
      const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
      res.send(`
        <html>
          <head><title>Shortened URL</title></head>
          <body style="font-family:sans-serif;text-align:center;margin-top:50px">
            <h2>Your shortened URL:</h2>
            <a href="${shortUrl}">${shortUrl}</a><br/><br/>
            <a href="/">Shorten another</a>
          </body>
        </html>
      `);
    }
  );
});

// Redirect to original URL
app.get("/:shortCode", (req, res) => {
  const shortCode = req.params.shortCode;
  db.get("SELECT url FROM urls WHERE short = ?", [shortCode], (err, row) => {
    if (err) return res.status(500).send("Server error.");
    if (row) {
      res.redirect(row.url);
    } else {
      res.status(404).send("Short URL not found.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
