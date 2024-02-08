import mongoose from "mongoose";
const schema = mongoose.Schema({
  userName: {
    type: String,
    minLength:5,
    maxLength:12,
    required: true,
  },
  password: {
    type: String,
    minLength:8,
    required: true,
  },
  firstName: {
    type: String,
    minLength:2,
    maxLength:20,
    required: true,
  },
  lastName: {
    type: String,
    minLength:3,
    maxLength:20,
    required: true,
  },
  email: {
    type: String,
    minLength:5,
    maxLength:30,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default:"USER"
  }, 
}
,
{timestamps:true}
);




const model = mongoose.models.User || mongoose.model("User", schema);
export default model;