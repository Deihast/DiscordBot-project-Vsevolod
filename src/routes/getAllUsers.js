const express = require ('express');
const router = express.Router();
const UserInterface = require('../models/interfaces/user.js');
const controller = require('../middleware/authContoller.js');

router.get('/users', controller.checkToken, async (req, res) => {
    const users = await UserInterface.getAllUsers();
    res.status(200).json(users);
});

module.exports = router;