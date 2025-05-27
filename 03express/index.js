
const express = require("express");

// ---------- Express App ----------
const app = express();

app.get('/', (req, res) => {
  return res.send("Hello from Express Server (Home Page)");
});

app.get('/about', (req, res) => {
  return res.send("Hello from Express Server (About Page) "+ " hey " + req.query.name + " you are " + req.query.age) ;
});

app.listen(3000, () => {
  console.log("Express Server running on port 3000");
});

// ---------- Core HTTP Server ----------
function myHandler(req, res) {
  if (req.url === '/favicon.ico') return res.end();

  const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`;
  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, () => {
    switch (myUrl.pathname) {
      case '/':
        if (req.method === 'GET') {
          res.end("Hello From Core HTTP Server");
        }
        break;

      case '/about':
        const username = myUrl.query.myname || "Guest";
        res.end(`Hi, ${username} Welcome to About Page`);
        break;

      case '/search':
        const search = myUrl.query.search_query;
        res.end(`You searched for ${search}`);
        break;

      case '/signup':
        if (req.method === 'GET') {
          res.end("Signup Page");
        } else if (req.method === 'POST') {
          res.end("Signup Successful");
        }
        break;

      default:
        res.end("404 Not Found");
    }
  });
}

// Start the Core HTTP server on a different port
const myServer = http.createServer(myHandler);
myServer.listen(8005, () => console.log("Core HTTP Server started on port 8005"));