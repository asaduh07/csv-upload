import mongoose from "mongoose";

const dataSchema= new mongoose.Schema({
    originalFilename: String,
    headers:[String],
    data:[{type:mongoose.Schema.Types.Mixed}]
});

export const DataModel= mongoose.model('Data',dataSchema);