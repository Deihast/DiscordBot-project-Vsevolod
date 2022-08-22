const UserModel = require('../mongoose/user.js');

async function createUser (userData) {
    const newUser = new UserModel(userData);
    const user = await newUser.save();
    return user;
}

async function deleteUser (uid) {
    await UserModel.findOneAndDelete({ uid: uid });
}

async function changeName (uid, newValue) {
    await UserModel.findOneAndUpdate({ uid: uid }, { $set: {name: newValue}}, { upsert: false, new: true });
}

async function changeGender (uid, newValue) {
    await UserModel.findOneAndUpdate({ uid: uid }, { $set: {gender: newValue}}, { upsert: false, new: true });
}

async function changeRole (uid, newValue) {
    await UserModel.findOneAndUpdate({ uid: uid }, { $set: {role: newValue}}, { upsert: false, new: true });
}

async function findUserById (uid) {
    const user = await UserModel.findOne({ uid });
    return user;
}

async function getAllUsers () {
    const users = [];
    const cursor = UserModel.find().cursor();

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        const user = { 
            name : doc.name,
            uid: doc.uid
        }

        users.push(user);
    }

    return users;
}

async function checkUserValid (uid) {
    const check = await UserModel.exists({ uid });

    return check;
}

async function addExp (uid, exp) {
    const user = await UserModel.findOne({ uid });

    let additionalEXP = exp;
    let newEXP = user.exp + Number(additionalEXP);
    const neededEXP = 5000;
    let currentEXP = newEXP - neededEXP;

    if (currentEXP >= 0) {
        currentLevel = user.level + 1;
        await UserModel.findOneAndUpdate({ uid: uid }, {$set: {exp: currentEXP} }, { upsert: false, new: true });
        await UserModel.findOneAndUpdate({ uid: uid }, {$set: {level: currentLevel} }, { upsert: false, new: true });
        return;
    } else {
        await UserModel.findOneAndUpdate({ uid: uid }, {$set: {exp: newEXP} }, { upsert: false, new: true });
        return;
    }
}

async function addRubies (uid, value) {
    const user = await UserModel.findOne({ uid: uid });
    const additionalRubies = value;
    const newRubies = user.rubies + Number(additionalRubies);

    await UserModel.findOneAndUpdate({ uid: uid }, {$set: {rubies: newRubies} }, { upsert: false, new: true });
}

async function addDemonCoins (uid, value) {
    const user = await UserModel.findOne({ uid: uid });
    const additionalDCoins = value;
    const newDCoins = user.demonCoins + Number(additionalDCoins);

    await UserModel.findOneAndUpdate({ uid: uid }, {$set: {demonCoins: newDCoins} }, { upsert: false, new: true });
}

module.exports =  { 
    createUser,
    deleteUser,
    changeName,
    changeGender,
    changeRole,
    findUserById,
    checkUserValid,
    addExp,
    addRubies,
    addDemonCoins,
    getAllUsers
};