const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.set("strictQuery", false)
        const {connection} = await mongoose.connect(process.env.DB_CONNECTION)
        const url = `${connection.host}:${connection.port}`
        console.log(`MongoDB connected in ${url}`);

    } catch (error) {
        console.log(`error MongoDB: ${error.message}`);
    }
}

module.exports = connectDB