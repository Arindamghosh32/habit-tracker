const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    frequency: { type: String, enum: ["daily", "weekly"] },
    completedDates: [{ type: String }],
    createdAt:{type:String,default:()=>new Date().toISOString()}
});

module.exports = mongoose.model("Date",dateSchema);