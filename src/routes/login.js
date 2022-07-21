const express = require('express');
const router = express.Router();
const service  = require('./register.js');

router.post('/login', (req, res) => {
    try {
        const { login, password } = req.body;
        const user = service.service.loginUser(login, password);

        res.status(200).json({ authKey: user.key, hashPass: user.password });
    } catch (error) {
        console.log(error);
        res.status(400).send('BAD_REQUEST');
    }
});

module.exports.router = router;