const mongoose = require('mongoose');

const { Schema } = mongoose;
const modelName = 'user';

const options = {
    timestamps: true,
}

const DbSchema = new Schema({
    gid: { type: String, required: true},
    uid: { type: String, required: true},
    name: { type: String, required: true},
    gender: String,
    role: String,
    wallet: Number,
    level: Number,
}, options);

DbSchema.index({ uid: 1 }, { unique: true });

module.exports =  mongoose.model(modelName, DbSchema, modelName);