const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog = require('./models/blog');

const userRoute =  require('./routes/user');
const blogRoute = require('./routes/blog');

const app  = express()
const port = 3000;

mongoose.connect("mongodb://localhost:27017/Wordify").then(e => console.log("Connected to MongoDB"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
// app.use(express.json());
app.use(checkForAuthenticationCookie("token"));


app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});



app.use(express.static(path.resolve("./public")));

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home" ,{
    user: req.user,
    blogs: allBlogs,
  });
});

app.use('/user', userRoute); 
app.use('/blog', blogRoute); 


app.listen(port, () => 
  console.log(`Server is running on http://localhost:${port}`));