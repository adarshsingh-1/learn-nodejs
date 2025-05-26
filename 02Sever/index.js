const http = require("http")
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
        
    
    const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);
    fs.appendFile("log.txt",log, (err, data) => {
        switch(myUrl.pathname) {
            case '/' :
                if(req.method === 'GET') {
                    res.end("Hello From Server");
                }
            break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi, ${username} Welcome to About Page`);
                break;
            
            case "/search":
                const search = myUrl.query.search_query;
                res.end(`You searched for ${search}`);
            case "/signup":
                if(req.method === 'GET') res.end("Signup Page");
                else if(req.method=== 'POST') {
                    //db query
                    res.end("Signup Successful");
                }

            default:
                res.end("404 Not Found");
        }
        // res.end("Hello From Server Again");
    })
    // console.log(req);

    // console.log("new req received");    
    // res.end("Hello From Server Again");
});

myServer.listen(8003, () => console.log("Server Started on port 8002"));


