const express = require ('express');
const router = express.Router();
const controller = require('../middleware/authContoller.js');

router.post('/', controller.login)

module.exports = router;