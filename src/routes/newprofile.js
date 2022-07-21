const express = require ('express');
const router = express.Router();

class CreateProfile {
    constructor (name, gender, role) {
        this.name = name 
        this.gender = gender 
        this.role = role 
    }
}

router.post('/newprofile', (req, res) => {

    const { name, gender, role } = req.body;
    const profile = new CreateProfile(name, gender, role);
    
    res.send(`Profile was created successfully!\nYour name: ${profile.name}\nYour gender: ${profile.gender}\nYour role: ${profile.role}`);
})

module.exports = router;