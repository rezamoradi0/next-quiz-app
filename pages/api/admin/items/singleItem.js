import QuestionModel from "@/models/Question";
import UserModel from "@/models/User";
import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";
export default async function handler(req, res) {
  if (req.method === "POST" && req.body) {
    const { token } = req.cookies;
    const userData = verifyToken(token);
    if (userData.role === "ADMIN") {
      const questionData = req.body;
      console.log(questionData);
      try {
        connectToDb();
        const adminInfo = await UserModel.findOne(
          { email: userData.email },
          "",
        );
        if (!adminInfo) return res.status(503).json();

        const questionCreateRes = await QuestionModel.create({
          ...questionData,
          authorId: adminInfo._id,
        });

        return res
          .status(201)
          .json({ ...questionData, id: questionCreateRes._id });
      } catch (err) {
        console.log("HERE error", err.message);
        return res.status(500).json({ message: err.message });
      }
    }
  } else if (req.method === "PUT") {
    const { token } = req.cookies;
    const userData = verifyToken(token);
    if (userData.role === "ADMIN") {
      const questionData = req.body;
      console.log(questionData);
      try {
        connectToDb();
        const adminInfo = await UserModel.findOne(
          { email: userData.email },
          "",
        );
        if (!adminInfo) return res.status(503).json();
        const questionCreateRes = await QuestionModel.findOneAndReplace(
          {
            _id: questionData.questionId,
          },
          {
            ...questionData,
          },
        );

        return res.status(200).json({ ...questionData });
      } catch (err) {
        console.log("HERE error", err.message);
        return res.status(500).json({ message: err.message });
      }
    }
  } else if (req.method === "DELETE") {
    const { token } = req.cookies;
    const userData = verifyToken(token);
    if (userData.role === "ADMIN") {
      const itemData = req.body;
      try {
    
        connectToDb();
        const adminInfo = await UserModel.findOne(
          { email: userData.email },
          "",
        );

        if (!adminInfo) {
          return res.status(404).json({ message: "NOT" });
        }

        switch (itemData.itemType) {
          case "question":
            await QuestionModel.findOneAndDelete({
              _id: itemData.itemId,
            });
            return res.status(200).json({ ...itemData });

          default:
            return res.status(404).json();
        }
      } catch (err) {
        console.log("HERE error", err.message);
        return res.status(500).json({ message: err.message });
      }
    }
  } else {
    return res.status(503).json();
  }
}
