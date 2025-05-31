##  URL Shortener

A simple Node.js-based URL shortener web application that generates shortened URLs, tracks click analytics, and stores data using MongoDB.

##  Features

- Generate short URLs (like `localhost:8001/url/abc123`)
- Redirects to original long URLs
- View all shortened URLs
- Tracks number of clicks (visit history)
- Uses MongoDB for storage

##  Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Templating Engine**: EJS  
  EJS (Embedded JavaScript) is used to dynamically render HTML pages on the server. It allows injecting data (like short URLs, click stats) directly into the frontend, which makes the app user-friendly and interactive without needing a frontend framework like React or Vue.
- **Unique ID Generator**: `shortid` package