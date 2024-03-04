import TextArea from "@/components/modules/form/TextArea";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ButtonBack from "@/components/modules/form/ButtonBack";
import Button from "@/components/modules/form/Button";
import TextInputLegend from "@/components/modules/form/TextInputLegend";
import {
  createItem,
  updateItem,
  deleteItem,
} from "@/api/services/adminServices";
import { usePanelBody } from "@/context/PanelBodyContext";
function CreateDescription({ defaultData, backOnClick }) {
  const { getPanelItems } = usePanelBody();
  const textEnRef = useRef();
  const [textEn, setTextEn] = useState(defaultData?.textEn || "");
  const textFaRef = useRef();
  const [textFa, setTextFa] = useState(defaultData?.textFa || "");
  const tagRef = useRef();
  const [tag, setTag] = useState(defaultData?.tag || "");
  const [save, setSave] = useState("Save");
  const [descriptionId, setDescriptionId] = useState(defaultData?._id || null);
  useEffect(() => {
    setSave("Save");
  }, [textEn, textFa, tag]);
  async function deleteQuestion() {
    const response = await deleteItem("description", descriptionId);
    if (response.status != 200) {
      alert("Error On Deleted  : description");
    } else {
      getPanelItems();
      backOnClick();
    }
  }
  async function saveDescription() {
    if (save === "Saved !" || save === "Updated !") {
      console.log("NoChange");
      return;
    }
    let data = {
      textEn,
      textFa,
      tag,
    };

    if (descriptionId) {
      data.id = descriptionId;
      const response = await updateItem(data, "description");
      if (response.status == 200) {
        setSave("Updated !");
      } else {
        console.log("HERE");
        setSave("Save");
      }
    } else {
      const response = await createItem(data, "description");

      if (response.status == 201) {
        const { id } = await response.json();
        setDescriptionId(id);
        setSave("Saved !");
      } else {
        setSave("Save");
      }
    }
  }
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
        <span className="text-lg">
          {descriptionId ? "Edit This Description" : "Add New Description"}
        </span>
        <div>
          {descriptionId && (
            <Button
              text={"Delete"}
              onClick={deleteQuestion}
              className="mx-2 bg-rose-600 text-gray-50"
            />
          )}
          <Button
            text={save}
            className="bg-sky-500 text-gray-50"
            onClick={saveDescription}
          />
        </div>
      </div>

      <form className="flex flex-col gap-y-4  p-5">
        <p>{descriptionId && " id  :" + descriptionId}</p>
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
