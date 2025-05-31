const express = require('express');
const {connectToMongoDB} = require("./connect")
const urlRoutes = require('./routes/urls');
const URL = require('./model/url');
const path = require('path')
const staticRoute = require('./routes/staticRouter');


const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => 
    console.log('Connected to MongoDB')
);
    
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//ssr example
app.get("/test", async(req, res) => {
    const allUrls = await URL.find({});

    return res.render("home",{
        urls:allUrls,
    });
    // return res.end('<h1> Hello World </h1>');
});

app.use('/url', urlRoutes);
app.use('/',staticRoute)

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timeStamp: Date.now() } } },
        { new: true }
    );
    if (!entry) return res.status(404).json({ error: "Short URL not found" });
    res.redirect(entry.redirectUrl);
});


app.listen(PORT, () => console.log (`Server is running on port ${PORT}`));