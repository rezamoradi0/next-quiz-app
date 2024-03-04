import mongoose from "mongoose";

const schema=mongoose.Schema({
textEn:String,
textFa:String,
tag:String,
authorId:String
});

const model = mongoose.models?.Description || mongoose.model("Description",schema);

export default model;