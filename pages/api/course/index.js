import { check } from "@/validator/Course";
import connectToDb from "@/configs/db";
import CourseModel from "@/models/Course";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const courseData = req.body;
    const checkResult = check({ ...courseData });
    if (checkResult !== true) {
      return res.status(403).json({ message: checkResult });
    }

    try {
      connectToDb();
      await CourseModel.create({ ...courseData });
      res.status(201).json(courseData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  if (req.method === "GET") {
    try {
      connectToDb();
      const Courses = await CourseModel.find({});
      res.status(200).json(Courses);
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
  if (req.method !== "POST") {
    return res.status(404).json({ message: "testing " });
  }
}
