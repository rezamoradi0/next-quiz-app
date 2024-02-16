import mongoose from "mongoose";

const schema = mongoose.Schema({
  subject: String,
  description: String,
  answerType: Number,
  image: String,
  authorId: String,
  lessonId:String
});

const model = mongoose.models.Questions || mongoose.model("Question", schema);
export default model;
