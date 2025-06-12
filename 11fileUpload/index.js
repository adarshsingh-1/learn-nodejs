const multer = require('multer');

const path = require('path');
const express = require('express');

const app = express();
const PORT = 8000;

// const upload = multer({
//   dest: 'uploads/' // Directory where files will be stored
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()} - ${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.render("homepage");
});

app.post('/upload', upload.single('profileimage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
})

app.listen(PORT, () => console.log('Server is running on port ' + PORT)); 
