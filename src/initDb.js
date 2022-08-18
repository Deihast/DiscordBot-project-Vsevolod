const mongoose = require('mongoose');

initDb = (config) => {
    const { url, mongooseOptions: options } = config.mongodb;
    try {
        mongoose.connect (url, options)
    } catch (error) {
        console.log('ERROR: ',error);
    }
}

module.exports = { initDb }