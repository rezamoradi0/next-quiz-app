import Button from "@/components/modules/form/Button";
import ButtonBack from "@/components/modules/form/ButtonBack";
import RatioButton from "@/components/modules/form/RatioButton";
import RatioGroup from "@/components/modules/form/RatioGroup";
import RatioList from "@/components/modules/form/RatioList";
import TextArea from "@/components/modules/form/TextArea";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
function CreateQuestion() {
  const [answerType, setAnswerType] = useState("one");
  const [questionComponent,setQuestionComponent]=useState();
  useEffect(()=>{
    setQuestionComponent(<RatioList />);

  },[answerType])
  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex  w-full flex-col justify-start  rounded-xl border border-zinc-700 bg-zinc-900"
    >
      <div className="flex min-h-16 items-center justify-between border-b border-b-zinc-700 p-4">
        <ButtonBack />
        <span className="text-lg">Add New Question</span>
        <Button text="Save" className="bg-sky-500 text-gray-50" />
      </div>
      <form className="flex w-full flex-col items-start justify-start gap-y-8 px-20 py-4">
        <p className="my-4">General Information</p>
        <div className="flex w-full  items-center  gap-x-4">
          <TextArea
            rows={5}
            tab={"Question Description (En)"}
            id={"descriptionEn"}
          />
          <TextArea
            rows={5}
            tab={" توضیحات سوال(Fa)"}
            id={"descriptionFa"}
            dir={"rtl"}
          />
        </div>
        <p className="my-4">Answer Type </p>
        <div className="flex flex-col  items-start justify-start gap-4 w-full">
         <RatioGroup  className="w-fit"
            value={answerType}
            setValue={setAnswerType}>
         <RatioButton
            id={"one"}
            text="One"
           
          />
          <RatioButton
            id={"multi"}
            text="Multi"
          />
          <RatioButton
            id={"text"}
            text="Text"
          />
         </RatioGroup>
        {questionComponent}
        </div>
      </form>
    </motion.div>
  );
}

export default CreateQuestion;
