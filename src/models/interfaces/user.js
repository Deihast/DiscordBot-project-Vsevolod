const UserModel = require('../mongoose/user.js');

async function createUser (userData) {
    const newUser = new UserModel(userData);
    const user = await newUser.save();
    return user;
}

async function findUserById (uid) {
    const user = await UserModel.findOne( { uid } );
    return user;
}

async function checkUserValid (uid) {
    const check = await UserModel.exists( { uid } );

    if (!check) {
        return false;
    } else {
        return true;
    }
}

async function checkGuildId (gid) {
    const check = await UserModel.exists( {gid} );
    
    if (!check) {
        return false;
    } else {
        return true;
    }
}

module.exports =  { 
    createUser,
    findUserById,
    checkUserValid,
    checkGuildId
};