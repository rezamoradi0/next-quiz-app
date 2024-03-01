import Button from "@/components/modules/form/Button";
import ButtonBack from "@/components/modules/form/ButtonBack";
import RatioButton from "@/components/modules/form/RatioButton";
import RatioGroup from "@/components/modules/form/RatioGroup";
import RatioList from "@/components/modules/form/RatioList";
import TextArea from "@/components/modules/form/TextArea";
import TextInputLegend from "@/components/modules/form/TextInputLegend";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  createItem,
  updateItem,
  deleteItem,
} from "@/api/services/adminServices";
// قرار بود تمیز باشه :/

function CreateQuestion({ defaultData, backOnClick ,onDeleteItem}) {
  const [answerType, setAnswerType] = useState(
    defaultData?.answerType || "one",
  );
  const [questionComponent, setQuestionComponent] = useState();
  const textAnswerFaRef = useRef(null);
  const textAnswerEnRef = useRef(null);
  const descriptionEnRef = useRef(null);
  const descriptionFaRef = useRef(null);

  const [descriptionEn, setDescriptionEn] = useState(
    defaultData?.descriptionEn || "",
  );
  const [descriptionFa, setDescriptionFa] = useState(
    defaultData?.descriptionFa || "",
  );
  const [tag, setTag] = useState(defaultData?.tag || "");
  console.log(tag);
  const tagRef = useRef();
  const [save, setSave] = useState("Save");
  const dataRef = useRef({});

  const [questionId, setQuestionId] = useState(defaultData?._id || false);
  useEffect(() => {
    setSave("Save");
  }, [descriptionFa, descriptionEn, answerType]);
  function setData(data) {
    setSave("Save");
    dataRef.current = data;
  }
  async function deleteQuestion() {
    const response = await deleteItem("question", questionId);
    if (response.status != 200) {
      alert("Error On Deleted  : question");
    }else {
     if(onDeleteItem){ onDeleteItem(); }
      backOnClick();

    }
  }
  async function saveQuestion() {
    if (save === "Saved !") {
      console.log("NoChange");
      return;
    }
    let data = {
      answerType,
      descriptionEn: descriptionEnRef.current.value,
      descriptionFa: descriptionFaRef.current.value,
      tag,
    };

    if (answerType === "text") {
      data.answerTextEn = textAnswerEnRef.current.value;
      data.answerTextFa = textAnswerFaRef.current.value;
    } else {
      data.answersArray = JSON.stringify(dataRef.current.listItems);
      data.answersIndex = JSON.stringify(dataRef.current.answersIndex);
    }
    if (questionId) {
      data.questionId = questionId;
      const response = await updateItem(data, "question");
      if (response.status == 200) {
        setSave("Updated !");
      } else {
        setSave("Save");
      }
    } else {
      const response = await createItem(data, "question");
      if (response.status == 201) {
        const { id } = await response.json();
        setQuestionId(id);
        setSave("Saved !");
      } else {
        setSave("Save");
      }
    }
  }
  useEffect(() => {
    switch (answerType) {
      case "multi":
        setQuestionComponent(
          <RatioList
            setData={setData}
            type="multi"
            defaultAnswers={defaultData?.answersIndex || null}
            defaultListItems={defaultData?.answersArray || null}
            lastId={defaultData?.answersArray.length || null}
          />,
        );
        break;
      case "text":
        setQuestionComponent(
          <>
            <p>Answer Text </p>
            <div className="flex w-full justify-between gap-x-4">
              <TextInputLegend ref={textAnswerEnRef} placeholder={"Answer"} />
              <TextInputLegend
                dir="rtl"
                ref={textAnswerFaRef}
                placeholder={"پاسخ"}
              />
            </div>
          </>,
        );
        break;
      //cast "one"
      default:
        setQuestionComponent(
          <RatioList
            setData={setData}
            type="one"
            defaultAnswers={defaultData?.answersIndex || null}
            defaultListItems={defaultData?.answersArray || null}
            lastId={defaultData?.answersArray.length || null}
          />,
        );
        break;
    }
  }, [answerType]);

  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" relative flex   w-full flex-col justify-start  rounded-xl border border-zinc-700 bg-zinc-900"
    >
      <div className=" sticky -top-4 z-10 flex min-h-16 items-center justify-between rounded-lg border-b border-b-zinc-700 bg-zinc-900 p-4">
        {backOnClick ? (
          <Button text="close" onClick={backOnClick} />
        ) : (
          <ButtonBack />
        )}
        <span className="text-lg">
          {questionId ? "Edit This Question" : "Add New Question"}
        </span>
        <div className="flex items-center gap-x-2">
          {questionId && (
            <Button
              text={"Delete"}
              onClick={deleteQuestion}
              className="bg-rose-600 text-gray-50"
            />
          )}
          <Button
            text={save}
            onClick={saveQuestion}
            className="bg-sky-500 text-gray-50"
          />
        </div>
      </div>
      <form className="flex w-full flex-col items-start justify-start gap-y-8 px-20 py-4">
        <div className="flex w-full items-center justify-between">
          <p className="my-4">General Information</p>
          {questionId && <p>ID : {questionId}</p>}
        </div>
        <TextInputLegend
          ref={tagRef}
          value={tag}
          callback={setTag}
    
          placeholder={"Tag"}
        />
        <div className="flex w-full  items-center  gap-x-4">
          <TextArea
            rows={5}
            tab={"Question Description (En)"}
            id={"descriptionEn"}
            ref={descriptionEnRef}
            onChange={setDescriptionEn}
            value={descriptionEn}
          />
          <TextArea
            rows={5}
            tab={" توضیحات سوال(Fa)"}
            id={"descriptionFa"}
            dir={"rtl"}
            ref={descriptionFaRef}
            onChange={setDescriptionFa}
            value={descriptionFa}
          />
        </div>
        <p className="my-4">Answer Type </p>
        <div className="flex w-full  flex-col items-start justify-start gap-4">
          <RatioGroup
            className="w-fit"
            value={answerType}
            setValue={setAnswerType}
          >
            <RatioButton id={"one"} text="One" />
            <RatioButton id={"multi"} text="Multi" />
            <RatioButton id={"text"} text="Text" />
          </RatioGroup>
          {questionComponent}
        </div>
      </form>
    </motion.div>
  );
}

export default CreateQuestion;
