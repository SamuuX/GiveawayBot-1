const mongoose = require('mongoose');
const colors = require('colors')
require('dotenv').config()
async function connect() {
    mongoose.set('strictQuery', false)

    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
        console.log(`[MONGO] Connected to Database`.green)
    });
    return;
}

module.exports = connect;
