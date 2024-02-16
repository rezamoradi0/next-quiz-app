import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

const model = mongoose.models?.Course || mongoose.model("Course", schema);
export default model;
