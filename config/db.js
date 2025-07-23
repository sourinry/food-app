const mongoose = require('mongoose');

//connection
const connectionDB = async () => {
try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected: ${mongoose.connection.host}`);
} catch (error) {
    console.log(`DB error ${error}`);
}
}


module.exports = connectionDB;