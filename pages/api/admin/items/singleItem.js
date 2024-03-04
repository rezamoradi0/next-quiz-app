import QuestionModel from "@/models/Question";
import UserModel from "@/models/User";
import DescriptionModel from "@/models/Description";
import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";
export default async function handler(req, res) {
  if (req.method === "POST" && req.body) {
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
        if (!adminInfo) return res.status(503).json();
        switch (itemData.itemType) {
          case "question":
            const questionCreateRes = await QuestionModel.create({
              ...itemData,
              authorId: adminInfo._id,
            });
            return res
              .status(201)
              .json({ ...itemData, id: questionCreateRes._id });

          case "description":
            const descriptionCreateRes = await DescriptionModel.create({
              ...itemData,
              authorId: adminInfo._id,
            });
            return res
              .status(201)
              .json({ ...itemData, id: descriptionCreateRes._id });

          default:
            res.status(404).json({ message: "NotFount this type " });
        }
      } catch (err) {
        console.log("HERE error", err.message);
        return res.status(500).json({ message: err.message });
      }
    }
  } else if (req.method === "PUT") {
    const { token } = req.cookies;
    const userData = verifyToken(token);
    if (userData.role === "ADMIN") {
      const itemData = req.body;
      console.log(itemData);
      try {
        connectToDb();
        const adminInfo = await UserModel.findOne(
          { email: userData.email },
          "",
        );
        if (!adminInfo) return res.status(503).json();
        switch (itemData.itemType) {
          case "question":
            await QuestionModel.findOneAndReplace(
              {
                _id: itemData.id,
              },
              {
                ...itemData,
              },
            );
            break;
            case "description":
              await DescriptionModel.findOneAndReplace(
                {
                  _id: itemData.id,
                },
                {
                  ...itemData,
                },
              );
              
              break;
          default:
            return res.status(404).json({ ...itemData });
        }
        return res.status(200).json({ ...itemData });
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
          case "description":
            await DescriptionModel.findOneAndDelete({
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
