const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');


const app = express();
const PORT = 8000;
//middleware or plugin
app.use(express.urlencoded({ extended: false }));



// Routes
//return html document with all users
app.get('/users' ,(req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
// REST API
//return a json object with all users
app.get('/api/users', (req, res) => {
    return res.json(users);
});

// return a user by id
//if we have the same route for different methods, we can use app.route
app
    .route('/api/users/:id')
    .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        const userIdx = users.findIndex((user) => user.id === id)
        users[userIdx] = { ...users[userIdx], ...body };
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            return res.json({ status: "success", updated: users[userIdx] });
        });
    })
    .delete((req, res) => {
        //edit user with id
        const id = Number(req.params.id);
        const userIdx = users.findIndex((user) => user.id === id);
        const delUser = users.splice(userIdx, 1)[0];
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            return res.json({ status: "success", deleted: delUser });
        });
    });


app.post('/api/users',(req, res) => {
    //TODO: Create a new user
    const body = req.body;
    // console.log("body", body); 
    users.push({ ...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err, data) => {
        return res.json({status: "success", id: users.length});
    })
    // return res.json({status: "pending"});
})


// app.patch('/api/users/:id',(req, res) => {
//     //TODO: Edit the user with id
//     return res.json({status: "pending"});
// })

// app.delete('/api/users/:id',(req, res) => {
//     //TODO: Delete the user with id
//     return res.json({status: "pending"});
// })



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
