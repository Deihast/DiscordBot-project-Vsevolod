const express = require('express');
const router = express.Router();
const crypto = require('crypto');

class AuthorizationService {
    users = [];
    
    registerUser = (login, password) => {
        this.users.push({ login, password});
    };

    isKeyValid = (key) => {
        const [ login ] = key.split('-');
        const user = this.users.find((item) => item.login === login);
        return user.key === key;
    };

    getUser = (login, password) => {
        const showuser = this.users.find((item) => item.password === password && item.login === login);
        return showuser;
    };

    loginUser = (login, password) => {
        const key = crypto.randomBytes(10).toString('hex');
        
        const idx = this.users.findIndex((item) => item.password === password && item.login === login);
        const hashpassword = crypto.createHash('sha256')
            .update(this.users[idx].password)
            .digest('hex');

        this.users[idx].password = hashpassword;
        this.users[idx].key = `${this.users[idx].login}-${key}`;

        const result = this.users[idx];
        console.log(result);

        if (!result) {
            console.log('THROWING ERROR');
            throw new Error('NOT_FOUND');
        }
        return result;
    };

    logoutUser = (login, password) => {
        const idx = this.users.findIndex((item) => item.password === password && item.login === login);
        delete this.users[idx].key;
        return this.users[idx]; 
    };
}

const service = new AuthorizationService();

router.post('/register', (req, res) => {

    const { login, password } = req.body;
    service.registerUser(login, password);
    const user = service.getUser(login, password);
    res.send(`Registration complete! Check your information:\nLogin: ${user.login}\nPassword: ${user.password}`);
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