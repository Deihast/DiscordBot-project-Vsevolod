const express = require('express');
const router = express.Router();
const service  = require('./register.js');

router.post('/logout', (req, res) => {
    const { login, password } = req.body;

    try {
        const user = service.service.logoutUser(login, password);
        res.status(200).send('See you!');
        console.log(user);
    } catch (error) {
        console.log(error);
        res.status(400).send('BAD_REQUEST!');
    }
});

module.exports.router = router;