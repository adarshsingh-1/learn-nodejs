const express = require("express");
const users= require("./MOCK_DATA.json");
const fs = require("fs")

const app = express();
const PORT = 8000;


app.use(express.json());


app.use(express.urlencoded({extended:false}));

//another way to write the api calls
app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id );
        return res.json(user);
    })

    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;

        const userIdx = users.findIndex((user) => user.id === id);

        // if (userIdx === -1) {
        // return res.status(404).json({ status: "error", message: "User not found" });
        // }

        // Update only the fields provided in the body
        users[userIdx] = { ...users[userIdx], ...body };

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to update file" });
        }
        return res.json({ status: "success", updated: users[userIdx] });
        });
    })

    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIdx = users.findIndex((user) => user.id === id);

        if (userIdx === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const delUser = users.splice(userIdx, 1)[0];

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to update file" });
            }
            return res.json({ status: "success", deleted: delUser });
        });
    });
//Rest API to get all users
app.get("/api/users", (req, res) => {
    return res.json(users);
});
// Rest API to get a user by id
// app.get("/api/users/:id", (req, res) => {
//     const id  = Number(req.params.id);
//     const user = users.find((user) => user.id === id );
//     return res.json(user);
// });

app.post("/api/users",(req, res) => {
    
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status:"success", id: users.length});
    })
    // console.log("body", body);
    
    // return res.json({status:"pending"});
});


// app.patch("/api/users/:id",(req, res) => {
//     //TODO: Edit the user with id
//     return res.json({status:"pending"});
// });


app.delete("/api/users/:id",(req, res) => {
    //TODO: Delete the  user with id
    return res.json({status:"pending"});
});



app.get("/users",(req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    return res.send(html);   
})





app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})