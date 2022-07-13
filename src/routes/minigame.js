const express = require ('express');
const path = require('node:path');
const router = express.Router();

router.get('/minigame', (req, res) => {
    const root = path.join(__dirname, '../endpoints/minigame.html')
    res.sendFile(root) 
})

module.exports = router;