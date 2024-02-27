import mongoose from "mongoose";

const schema = mongoose.Schema({

  answerType: String,
  descriptionEn: String,
  descriptionFa: String,
  answersArray:String,
  answersIndex:String,
  answerTextEn:String,
  answerTextFa:String,
  authorId: String,
});

const model = mongoose.models?.Question || mongoose.model("Question", schema);
export default model;
