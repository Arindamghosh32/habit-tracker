const mongoose = require('mongoose');

const connectDB = async(req,res) =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
    }
    catch{
        console.error("There is error in connectivity");
    }
}

module.exports = connectDB;