import FloatMenu from "@/components/modules/menu/FloatMenu";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import CourseModel from "@/models/Course";
import connectToDb from "@/configs/db";
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ButtonLink from "@/components/modules/form/ButtonLink";
import PanelBody from "@/components/modules/panel/PanelBody";
import { useRouter } from "next/router";
import CreateCourse from "@/components/templates/createItems/CreateCourse";
import PopupFull from "@/components/modules/popup/PopupFull";
import CreateQuestion from "@/components/templates/createItems/CreateQuestion";

const variantsDescription = {
  open: { opacity: [0, 0.4, 1] },
  closed: { opacity: [0, 0.5, 1] },
};

function AdminPanel({ userData, menuData }) {
  const router = useRouter();
  const [createComponent, setCreateComponent] = useState(null);
  const [menuDataState, setMenuDataState] = useState(menuData);
  const [isAnimDescription, setIsAnimDescription] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  function menuSelectCallBack(selectedItem) {
    router.replace("admin");
    setSelectedMenu(selectedItem.index);

    setIsAnimDescription((lastState) => {
      return !lastState;
    });
  }
  useEffect(() => {
    const { create } = router.query;
    switch (create) {
      case "course":
        setCreateComponent(
          <PopupFull>
            <CreateCourse />
          </PopupFull>,
        );
        break;
        case "question":
          setCreateComponent(
            <PopupFull>
              <CreateQuestion />
            </PopupFull>,
          );
          break;
      default:
        setCreateComponent(null);
        break;
    }
  }, [router.asPath]);
  useEffect(() => {
    // menuDataState[selectedMenu].data=[{name:"TEst"},{name:"TEst"},{name:"TEst"}]
  }, [selectedMenu]);
  return (
    <main className="flex min-h-screen w-full flex-col bg-zinc-900 p-8">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex w-full flex-col justify-between"
      >
        <div className=" flex justify-between text-3xl font-bold">
          <div>
            <span> WellCome </span>{" "}
            <span className="capitalize text-blue-500">
              {userData.firstName}{" "}
            </span>
          </div>
          <ButtonLink
            href={"/dashboard"}
            text="User Panel"
            className="bg-blue-500"
          />
        </div>
        <FloatMenu
          floatClassName="bg-blue-500"
          callBack={menuSelectCallBack}
          menuItems={menuDataState}
        />
      </motion.div>
      <motion.div
        variants={variantsDescription}
        animate={isAnimDescription ? "open" : "closed"}
        transition={{ duration: 2 }}
        className="flex w-1/2 flex-col gap-4"
      >
        <PanelBody panelData={menuDataState[selectedMenu]} />
      </motion.div>
      {createComponent || <></>}
    </main>
  );
}

export default AdminPanel;

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
    "-_id userName firstName lastName email role",
  );
  if (userData.role != "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  const coursesData = await CourseModel.find({}, "-_id name description").limit(
    5,
  );
  const coursesDataObj = JSON.parse(JSON.stringify(coursesData));
  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
      menuData: [
        {
          name: "Courses",
          queryAddress: "create=course",
          index: 0,
          data: coursesDataObj,
        },
        { name: "Levels", queryAddress: "create=level", index: 1 },
        { name: "Lessons", queryAddress: "create=lesson", index: 2 },
        { name: "Question", queryAddress: "create=question", index: 3 },
        { name: "Users", queryAddress: "create=user", index: 4 },
      ],
    },
  };
}
