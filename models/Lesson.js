import mongoose from "mongoose";
const schema=mongoose.Schema({
subject:String,
slides:String,
levelId:String
});

const model=mongoose.models.Lessons||mongoose.model("Lesson",schema);
export default model;