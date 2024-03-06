import Button from "@/components/modules/form/Button";
import ButtonBack from "@/components/modules/form/ButtonBack";
import ItemsOrigin from "@/components/modules/menu/ItemsOrigin";
import ItemsTarget from "@/components/modules/menu/ItemsTarget";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Pagination from "@/components/modules/pagination/Pagination";
import { getItems } from "@/api/services/adminServices";
const itemPerPage = 10;
function CreateLesson({ defaultData, backOnClick }) {
  const [questionData, setQuestionData] = useState([
    { name: "Intern", id: 2 },
    { name: "Junior", id: 3 },
    { name: "MidLevel", id: 4 },
    { name: "Senior", id: 5 },
    { name: "Intern", id: 10 },
    { name: "Junior", id: 11 },
    { name: "MidLevel", id: 12 },
    { name: "Senior", id: 13 },
    { name: "Intern", id: 14 },
  ]);
  const [descriptionData, setDescriptionData] = useState([
    { name: "Test", id: 7 },
    { name: "Jest", id: 8 },
    { name: "React", id: 9 },
    { name: "Js", id: 5 },
  ]);
  const [questionPageNumber, setQuestionPageNumber] = useState(1);
  const [descriptionPageNumber, setDescriptionPageNumber] = useState(1);
  async function _getItems(itemType, pageNumber = 1, limit = itemPerPage) {
    const response = await getItems(itemType, pageNumber, limit);
    if (response.status !== 200) {
      alert("ERROR");
    } else {
      const responseData = await response.json();
      console.log(responseData);
      if (itemType === "description") {
        setDescriptionData(responseData.items);
      } else if (itemType === "question") {
        setQuestionData(responseData.items);
      }
    }
  }
  useEffect(() => {}, [defaultData]);
  useEffect(() => {
    _getItems("description");
  }, [descriptionPageNumber]);
  useEffect(() => {
    _getItems("question");
  }, [questionPageNumber]);
  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex  w-full flex-col justify-start  rounded-xl border border-zinc-700 bg-zinc-900 "
    >
      <div className="mb-1 flex min-h-16 items-center justify-between border-b border-b-zinc-700 p-4">
        <ButtonBack />
        <span className="text-lg">Add New Lesson</span>
        <Button text="Save" className="bg-sky-500 text-gray-50" />
      </div>
      <div className="flex w-full items-stretch justify-between gap-x-8 p-1 ">
        <div className="scroll-custom max-h-[80vh] w-full overflow-y-auto">
          <ItemsTarget header={"Lesson Items"} className="min-h-full" />
        </div>
        <ItemsOrigin
          className="min-h-full"
          header={"Available  Questions"}
          dataArray={questionData}
          itemType="question"
        >
          <Pagination
            className="my-4 w-full justify-between"
            onChange={setQuestionPageNumber}
            lastPage={1}
          />
        </ItemsOrigin>
        <ItemsOrigin
          className="min-h-full"
          header={"Available  Descriptions"}
          dataArray={descriptionData}
          itemType="description"
        >
          <Pagination
            className="my-4 w-full justify-between"
            onChange={setDescriptionPageNumber}
            lastPage={1}
            
          />
        </ItemsOrigin>
      </div>
    </motion.div>
  );
}

export default CreateLesson;
