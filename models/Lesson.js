import mongoose from "mongoose";
const schema = mongoose.Schema({
  tag: String,
  text: String,
  slides: String,
});

const model = mongoose.models.Lessons || mongoose.model("Lesson", schema);
export default model;
