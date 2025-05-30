const express = require('express');
const {handleGetAllUsers, 
    handleGetUserById, 
    handleGetUpdateUserById, 
    handleDeleteUserById, 
    handleCreateNewUser
} = require('../controllers/user');

const router = express.Router();

// Routes
router
    .route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handleGetUpdateUserById)
    .delete(handleDeleteUserById);


module.exports = router;