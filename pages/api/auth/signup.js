import connectToDb from "@/configs/db";
import { check } from "@/Validator/User";
import UserModel from "@/models/User";
import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(403).json({ message: "forbidden" });
  } else {
    const userInfo = req.body;
    userInfo.role = "USER";
    const checkRes = check(userInfo);

    if (checkRes === true) {
      try {
        connectToDb();
        const hasUser = await UserModel.findOne({
          $or: [{ email: userInfo.email }, { userName: userInfo.userName }],
        });
        if (hasUser) {
          return res
            .status(403)
            .json({ message: "Email Or UserName Not Valid" });
        }
        const hashedPassword = await hashPassword(userInfo.password);
        const newToken = generateToken({email:userInfo.email});
        await UserModel.create({...userInfo, password: hashedPassword });

        return res
          .setHeader(
            "Set-Cookie",
            serialize("token", newToken, {
              httpOnly: true,
              path:"/",
              maxAge: 60 * 60 ,
            }),
          )
          .status(201)
          .json({ message: userInfo });
      } catch (err) {
        return res.status(403).json({ error: err.message });
      }
    } else {
      return res.status(403).json({ checkRes });
    }
  }
}
