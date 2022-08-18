const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { AuthorizationService } = require('../utils/authService.js');

const service = new AuthorizationService();

router.post('/register', (req, res) => {
    const { login, password } = req.body;
    service.registerUser(login, password);
    const user = service.getUser(login, password);
    console.log(login, password);
    res.send('Registration complete!');
});

router.get('/secured-health-check', (req, res) => {
    const { key } = req.headers;
    if (!service.isKeyValid(key)) {
        res.status(401).send('UNAUTHORIZED');
    }
    res.status(200).send('Server is On.');
});

module.exports.service = service;
module.exports.router = router;