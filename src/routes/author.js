const express = require ('express');
const path = require('node:path');
const router = express.Router();

router.get('/author', (req, res) => {
    const root = path.join(__dirname, '../endpoints/author.html')
    res.sendFile(root) 
})

module.exports = router;