let http = require("http");
let file = require("fs");

let port = 3000;

let sendDate = (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  file.readFile("arday.txt", "utf-8", (err, data) => {
    if (err) return res.end("Error is exist");
    res.write(data);
    res.end();
  });
};

// let readFile = (req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   let text = file.readFileSync("arday.txt");
//   res.end(`<h3>${text}</h3>`);
// };

// let getRes = function (req, res) {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end("<h1>Hello worlds</h1>");
// };

let server = http.createServer(sendDate);
server.listen(port);
