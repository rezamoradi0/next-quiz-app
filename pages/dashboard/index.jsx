import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDb from "@/configs/db";
import { motion } from "framer-motion";
import CourseModel from "@/models/Course";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";

const variantsDescription = {
  open: { opacity: [0, 0.4, 1] },
  closed: { opacity: [0, 0.5, 1] },
};

function menuReducer(state, action) {
  switch (action.type) {
    case "selectMenu":
      return { ...state, selectedCourse: action.selectedIndex };
    default:
      return state;
  }
}
const initialState = {
  selectedCourse: 0,
};
function Dashboard({ userData, coursesData }) {
  const menuItemsRef = useRef(new Array());
  const floatingItemRef = useRef();
  const [menuState, dispatch] = useReducer(menuReducer, initialState);
  const [isAnimDescription, setIsAnimDescription] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    function floatHandler() {
      floatingItemRef.current.style.height =
        menuItemsRef.current[menuState.selectedCourse].offsetHeight + "px";
      floatingItemRef.current.style.width =
        menuItemsRef.current[menuState.selectedCourse].offsetWidth + "px";
      floatingItemRef.current.style.left =
        menuItemsRef.current[menuState.selectedCourse].offsetLeft + "px";
      floatingItemRef.current.style.top =
        menuItemsRef.current[menuState.selectedCourse].offsetTop + "px";

      setIsAnimDescription((lastState) => {
        return !lastState;
      });
    }
    if (firstRender) {
      setTimeout(() => {
        floatHandler();
      }, 100);
      setFirstRender(false);
    } else {
      floatHandler();
    }
  }, [menuState.selectedCourse]);
  return (
    <main className="flex min-h-screen w-full flex-col bg-zinc-900 p-8">
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex w-full flex-col justify-between"
      >
        <div className=" text-3xl font-bold ">
          <span>WellCome</span>{" "}
          <span className="capitalize">{userData.firstName} </span>
        </div>

        <ul className="relative my-8 flex  items-center justify-start gap-x-6">
          {coursesData.map((course, i) => {
            return (
              <li
                ref={(courseElement) => {
                  return (menuItemsRef.current[i] = courseElement);
                }}
                key={i}
                onClick={() => {
                  dispatch({ type: "selectMenu", selectedIndex: i });
                }}
                className={`${menuState.selectedCourse === i ? " text-gray-50" : "text-gray-400"} z-10  cursor-pointer rounded-full bg-transparent px-5  py-2 `}
              >
                {course.name}
              </li>
            );
          })}
          <span
            className="absolute z-0 rounded-full  bg-sky-600 duration-700"
            ref={floatingItemRef}
          ></span>
        </ul>
      </motion.div>
      <motion.div
        variants={variantsDescription}
        animate={isAnimDescription ? "open" : "closed"}
        transition={{ duration: 2 }}
      >
        {coursesData[menuState.selectedCourse].description}
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
    "-_id userName firstName lastName email",
  );
  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
      coursesData: JSON.parse(JSON.stringify(coursesData)),
    },
  };
}
