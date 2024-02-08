import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDb from "@/configs/db";
import {motion} from "framer-motion"
function Dashboard({userData}) {
return <motion.main className="flex flex-col w-full p-8 bg-zinc-900 min-h-screen">
        <div className="flex justify-between font-bold text-3xl ">
            <div><span>WellCome</span> <span className="capitalize">{userData.firstName} </span></div>
            <div></div>
        </div>

</motion.main>
}

export default Dashboard;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const verifyPayload = verifyToken(token);
  if (!verifyPayload) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  connectToDb();
  const userData = await UserModel.findOne(
    { email: verifyPayload.email },
   "-_id userName firstName lastName email"
  );
    console.log(userData);
  return {
    props: {userData:JSON.parse(JSON.stringify(userData))},
  };
}
