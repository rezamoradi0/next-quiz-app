import { useState } from "react";
import Head from "next/head";
import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import CourseModel from "@/models/Course";
import { verifyToken } from "@/utils/auth";
import { motion } from "framer-motion";
import FloatMenu from "@/components/modules/menu/FloatMenu";
import ButtonLink from "@/components/modules/form/ButtonLink";

const variantsDescription = {
  open: { opacity: [0, 0.4, 1] },
  closed: { opacity: [0, 0.5, 1] },
};

function Dashboard({ userData, coursesData }) {
  const isAdmin = userData.role === "ADMIN";
  const [selectedCourse, setSelectedCourse] = useState(() => coursesData[0]);
  const [isAnimDescription, setIsAnimDescription] = useState(false);
  function selectMenuCallBack(selectedItem) {
    setSelectedCourse(selectedItem);
    setIsAnimDescription((lastState) => {
      return !lastState;
    });
  }
  return (
    <main className="flex min-h-screen w-full flex-col bg-zinc-900 p-8">
      <Head>
        <title>User Dashboard</title>
      </Head>
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex w-full flex-col justify-between"
      >
        <div className=" flex justify-between text-3xl font-bold">
          <div>
            <span>WellCome</span>{" "}
            <span className="capitalize text-teal-500">{userData.firstName} </span>
          </div>
          {isAdmin && (
            <ButtonLink text="Admin Panel" href={"/dashboard/admin"} className="bg-teal-500"/>
          )}
        </div>
        <FloatMenu  floatClassName="bg-teal-500"  callBack={selectMenuCallBack} menuItems={coursesData} />
      </motion.div>
      <motion.div
        variants={variantsDescription}
        animate={isAnimDescription ? "open" : "closed"}
        transition={{ duration: 2 }}
      >
        {selectedCourse?.description}
      </motion.div>
    </main>
  );
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
  const coursesData = await CourseModel.find({}, "-_id name description");
  const userData = await UserModel.findOne(
    { email: verifyPayload.email },
    "-_id userName firstName lastName email role",
  );
  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
      coursesData: JSON.parse(JSON.stringify(coursesData)),
    },
  };
}
