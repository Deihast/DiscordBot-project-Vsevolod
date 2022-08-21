const express = require ('express');
const router = express.Router();
const UserInterface = require('../models/interfaces/user.js')

router.get('/:uid', async (req, res) => {
    const userID = req.params.uid
    const userInfo = await UserInterface.findUserById(userID);

    if (!userInfo) return res.status(404).send('NOT FOUND');

    res.status(200).json({ name: userInfo.name, uid: userInfo.uid });
})

module.exports = router;