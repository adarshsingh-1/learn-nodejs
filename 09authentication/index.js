const express = require('express');
const {connectToMongoDB} = require("./connect")
const URL = require('./model/url');
const path = require('path')
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly, checkAuth} = require('./middleware/auth')




const staticRoute = require('./routes/staticRouter');
const urlRoutes = require('./routes/urls');
const userRoute = require('./routes/user');


const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => 
    console.log('Connected to MongoDB')
);
    
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/url', restrictToLoggedInUserOnly, urlRoutes);
app.use('/user', userRoute);
app.use('/',checkAuth, staticRoute);

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