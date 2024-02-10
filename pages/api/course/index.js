import { check } from "@/Validator/Course";
import connectToDb from "@/configs/db";
import CourseModel from "@/models/Course";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "testing " });
  } 

  const courseData = req.body;
  const checkResult =  check({...courseData});
  if (checkResult!==true) {
    return res.status(403).json({ message: checkResult });
  }

  try {
    connectToDb();
    await CourseModel.create({ ...courseData });
    res.status(201).json(courseData);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}
