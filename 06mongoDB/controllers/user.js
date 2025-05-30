const User = require('../models/user'); 

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) return res.status(404).json({ msg: "User not found" });
    return res.json(foundUser);
}

async function handleGetUpdateUserById(req, res) {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    if (!updatedUser) return res.status(404).json({ msg: "User not found" });
    return res.json({ status: "Updated" });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Deleted" });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    });

    return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleGetUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
};