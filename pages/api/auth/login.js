import connectToDb from "@/configs/db";
import { check } from "@/validator/Login";
import UserModel from "@/models/User";
import { generateToken, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const userInfo = req.body;
    const checkResult = await check(userInfo);
    if (checkResult === true) {
      connectToDb();
      const userData = JSON.parse(
        JSON.stringify(
          await UserModel.findOne(
            { email: userInfo.email },
            "-_id email password role",
          ),
        ),
      );
      if (!userData) {
        return res.status(403).json("Email Or Password Is Wrong");
      }
      const isTruePassword = await verifyPassword(
        userInfo.password,
        userData.password,
      );
      if (isTruePassword) {
        const newToken = generateToken({ email: userInfo.email,role:userData.role });
        return res
          .setHeader(
            "Set-Cookie",
            serialize("token", newToken, {
              httpOnly: true,
              path: "/",
              maxAge: 60 * 60,
            }),
          )
          .status(200)
          .json(isTruePassword);
      } else {
        return res.status(403).json("Email Or Password Is Wrong");
      }
    }

    return res.status(404).json(checkResult);
  } else {
    return res.status(403).json("Method Not Supported");
  }
}
