const express = require ('express');
const router = express.Router();
const UserInterface = require('../models/interfaces/user.js')

router.get('/users', async (req, res) => {
    const users = await UserInterface.getAllUsers();
    res.status(200).json(users);
})

module.exports = router;