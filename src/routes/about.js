const express = require ('express');
const path = require('node:path');
const router = express.Router();

router.get('/about', (req, res) => {
    const root = path.join(__dirname, '../endpoints/about.html')
    res.sendFile(root) 
})

module.exports = router;