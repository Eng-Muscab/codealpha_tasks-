const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("urls.db", (err) => {
  if (err) return console.log("DB Error: ", err.message);
  db.run(
    "create table if not exists urls(id integer primary key autoincrement, url text, short text unique)"
  );
});

function generateShort(length = 6) {
  const chart =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chart.charAt(Math.floor(Math.random() * chart.length));
  }
  return result;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/shorten", (req, res) => {
  const url = req.body.url;
  const shortCode = generateShort();

  db.run(
    "insert into urls(url,short) values(?,?)",
    [url, shortCode],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("SomeThing went wrong.");
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
  console.log(`The port is running ${port}`);
});
