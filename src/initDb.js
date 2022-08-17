const mongoose = require('mongoose');

module.exports = (config) => {
    const { url, mongooseOptions: options } = config.mongodb;
    try {
        mongoose.connect (url, options)
    } catch (error) {
        console.log('ERROR: ',error);
    }
}