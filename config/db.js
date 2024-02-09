const mongoose = require("mongoose");

// console.log(typeof(process.env.MONGO_URI));
mongoose.connect(process.env.MONGO_URI);

const connectionDb = mongoose.connection;

connectionDb.on('error', (err) => {
    console.log(err);
})

connectionDb.on('connected', () => {
    console.log("Connected to Database Successfully.");
})

module.exports = connectionDb;