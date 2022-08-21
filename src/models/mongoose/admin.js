const mongoose = require('mongoose');

const { Schema } = mongoose;
const modelName = 'admin';

const options = {
    timestamps: true,
}

const DbSchemaAdmins = new Schema({
    uid : { type: String, required: true},
    login:  { type: String, required: true },
    password: { type: String, required: true }
}, options)

DbSchemaAdmins.index({ uid: 1 }, { unique: true });

module.exports =  mongoose.model(modelName, DbSchemaAdmins, modelName);