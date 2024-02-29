import TextArea from "@/components/modules/form/TextArea";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ButtonBack from "@/components/modules/form/ButtonBack";
import Button from "@/components/modules/form/Button";
import TextInputLegend from "@/components/modules/form/TextInputLegend";
function CreateDescription({ defaultData, backOnClick, onDeleteItem }) {
  const textEnRef = useRef();
  const [textEn, setTextEn] = useState(defaultData?.textEn || "");
  const textFaRef = useRef();
  const [textFa, setTextFa] = useState(defaultData?.textFa || "");
  const tagRef = useRef();
  const [tag, setTag] = useState(defaultData?.tag || "");

  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" flex  w-full flex-col justify-start  rounded-xl border border-zinc-700 bg-zinc-900"
    >
      <div className="flex min-h-16 items-center justify-between border-b border-b-zinc-700 p-4">
        {backOnClick ? (
          <Button text="close" onClick={backOnClick} />
        ) : (
          <ButtonBack />
        )}
        <span className="text-lg">Add New Description</span>
        <Button text="Save" className="bg-sky-500 text-gray-50" />
      </div>

      <form className="flex flex-col gap-y-4  p-5">
        <TextInputLegend
          ref={tagRef}
          value={tag}
          callback={setTag}
          placeholder={"Tag"}
        />
        <div className="flex justify-between gap-x-4">
          <TextArea
            tab={"Description En"}
            ref={textEnRef}
            value={textEn}
            onChange={setTextEn}
          />
          <TextArea
            tab={"توضیحات فارسی"}
            dir={"rtl"}
            ref={textFaRef}
            value={textFa}
            onChange={setTextFa}
          />
        </div>
      </form>
    </motion.div>
  );
}

export default CreateDescription;
