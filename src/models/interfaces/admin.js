const AdminModel = require('../mongoose/admin.js');

async function createAdmin (userData) {
    const newAdmin = new AdminModel(userData);
    const admin = await newAdmin.save();
    return admin;
}

async function findAdminById (uid) {
    const admin = AdminModel.findOne({ uid });
    return admin;
}

async function adminIsValid (uid) {
    const check = AdminModel.exists({ uid });
    return check;
}

module.exports = {
    createAdmin,
    findAdminById,
    adminIsValid
}