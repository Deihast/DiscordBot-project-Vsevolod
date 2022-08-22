const AdminInterface = require('../models/interfaces/admin.js');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/config.json')});
const secret = process.env.SECRET;
const key = process.env.KEY;
const jwt = require('jsonwebtoken');

const generateAccessToken = (uid, login) => {
    const payload = {
        uid,
        login
    }

    return jwt.sign(payload, key, { expiresIn: '24h' });
}

class authController {
    async login (req, res) {
        const adminID = req.query.uid
        const password = req.query.password;

        const adminInfo = await AdminInterface.findAdminById(adminID);
        if (!adminInfo) return res.status(404).send('NOT FOUND: invalid ID!');

        const hashedPassword = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        
        if (hashedPassword !== adminInfo.password) return res.status(403).send('FORBIDDEN: invalid password!');

        const token = generateAccessToken(adminInfo.uid, adminInfo.login);
        
        return res.status(200).send(`Welcome!, ${adminInfo.login}, authtoken: ${token}`);
    } 
    
    async checkToken (req, res, next) {
        const { authorization } = req.headers;
        
        try {
            const token = authorization.split(' ')[1];
            if (!token) return res.status(401).send('UNAUTHORIZED');
            const decodedToken = jwt.verify(token, key);
            next();
        } catch (err) {
            return res.status(401).send('UNAUTHORIZED');
        }
    }
}

module.exports =  new authController();