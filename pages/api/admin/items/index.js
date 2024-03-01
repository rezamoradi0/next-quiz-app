import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import QuestionModel from "@/models/Question";
import CourseModel from "@/models/Course";
function getPageNumber(count, limit) {
  const remaining = count % limit;
  return remaining ? parseInt(count / limit) + 1 : parseInt(count / limit);
}
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { token } = req.cookies;
    const userData = verifyToken(token);
    if (!userData || userData.role !== "ADMIN") {
      return res
        .status(503)
        .json({ message: "Just Get is available and Only admins Can Read!" });
    }
    const { type, page = 1, limit = 5 } = req.query;
    try {
      connectToDb();
      switch (type.toLowerCase()) {
        case "question":
          const allCount = await QuestionModel.countDocuments({});
          const pageNumber = getPageNumber(allCount,limit);
          const questionList = await QuestionModel.find({}, null, {
            skip: Number(page - 1) * limit,
          }).limit(limit);

          return res.status(200).json({ items:[...questionList], pageNumber });
        case "course":
          const courseList = await CourseModel.find({}, null, {
            skip: Number(page - 1) * limit,
          }).limit(limit);
          return res.status(200).json({ ...courseList });

        default:
          return res.status(404).json({ message: "type not found" });
      }
    } catch (err) {
      return res.status(200).json({ message: err.message });
    }
  }
  return res.status(503).json({ message: "Just Get is available" });
}
