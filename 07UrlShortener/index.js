const express = require('express');
const {connectToMongoDB} = require("./connect")
const urlRoutes = require('./routes/urls');
const URL = require('./model/url');


const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => 
    console.log('Connected to MongoDB')
);
    

app.use(express.json());

app.use('/url', urlRoutes);

app.get("/:shortId", async (req, res) => {
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