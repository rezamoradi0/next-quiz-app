import Button from "@/components/modules/form/Button";
import ButtonBack from "@/components/modules/form/ButtonBack";
import RatioButton from "@/components/modules/form/RatioButton";
import RatioGroup from "@/components/modules/form/RatioGroup";
import RatioList from "@/components/modules/form/RatioList";
import TextArea from "@/components/modules/form/TextArea";
import TextInputLegend from "@/components/modules/form/TextInputLegend";
import { motion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  createItem,
  updateItem,
  deleteItem,
} from "@/api/services/adminServices";
// قرار بود تمیز باشه :/

function reducer(state, action) {
  switch (action.type) {
    case "defaultData":
      return { ...action.payload };
    case "setTag":
      return { ...state, tag: action.payload };
    case "setAnswerType":
      return { ...state, answerType: action.payload };
    case "setDescriptionEn":
      return { ...state, descriptionEn: action.payload };

    case "setDescriptionFa":
      return { ...state, descriptionFa: action.payload };
    case "setQuestionId":
      return { ...state, questionId: action.payload };
    case "setTextAnswerEn":
      return { ...state, textAnswerEn: action.payload };
    case "setTextAnswerFa":
      return { ...state, textAnswerFa: action.payload };
    default:
      return state;
  }
}

function CreateQuestion({ defaultData, backOnClick, onDeleteItem }) {
  const textAnswerFaRef = useRef(null);
  const textAnswerEnRef = useRef(null);
  const descriptionEnRef = useRef(null);
  const descriptionFaRef = useRef(null);
  const dataRef = useRef({});
  const tagRef = useRef();

  const initialState = {
    questionId: null,
    tag: "test",
    answerType: "one",
    descriptionEn: "",
    descriptionFa: "",
    answerTextEn: "",
    answerTextFa: "",
    answersArray:null,
    answersIndex:""

  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // Replace with Reducer Please
  const [questionComponent, setQuestionComponent] = useState();
  const [save, setSave] = useState("Save");


  useEffect(() => {
    setSave("Save");
  }, [state]);
  function setData(data) {
    setSave("Save");
    dataRef.current = data;
  }
  async function deleteQuestion() {
    const response = await deleteItem("question", state.questionId);
    if (response.status != 200) {
      alert("Error On Deleted  : question");
    } else {
      if (onDeleteItem) {
        onDeleteItem();
      }
      backOnClick();
    }
  }
  async function saveQuestion() {
    if (save === "Saved !") {
      console.log("NoChange");
      return;
    }
    let data = {
      answerType: state.answerType,
      descriptionEn: descriptionEnRef.current.value,
      descriptionFa: descriptionFaRef.current.value,
      tag: state.tag,
    };

    if (state.answerType === "text") {
      data.answerTextEn = textAnswerEnRef.current.value;
      data.answerTextFa = textAnswerFaRef.current.value;
    } else {
      data.answersArray = JSON.stringify(dataRef.current.listItems);
      data.answersIndex = JSON.stringify(dataRef.current.answersIndex);
    }
    if (state.questionId) {
      data.questionId = state.questionId;
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
        dispatch({ type: "setQuestionId", payload: id });
        setSave("Saved !");
      } else {
        setSave("Save");
      }
    }
  }

  useEffect(() => {
    if (defaultData) {
      console.log(defaultData.answersArray);
      dispatch({ type: "defaultData", payload: defaultData });
    }
  }, [defaultData]);
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
          {state.questionId ? "Edit This Question" : "Add New Question"}
        </span>
        <div className="flex items-center gap-x-2">
          {state.questionId && (
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
          {state.questionId && <p>ID : {state.questionId}</p>}
        </div>
        <TextInputLegend
          ref={tagRef}
          value={state.tag}
          callback={(value) => {
            dispatch({ type: "setTag", payload: value });
          }}
          placeholder={"Tag"}
        />
        <div className="flex w-full  items-center  gap-x-4">
          <TextArea
            rows={5}
            tab={"Question Description (En)"}
            id={"descriptionEn"}
            ref={descriptionEnRef}
            onChange={(value) => {
              dispatch({ type: "setDescriptionEn", payload: value });
            }}
            value={state.descriptionEn}
          />
          <TextArea
            rows={5}
            tab={" توضیحات سوال(Fa)"}
            id={"descriptionFa"}
            dir={"rtl"}
            ref={descriptionFaRef}
            onChange={(value) => {
              dispatch({ type: "setDescriptionFa", payload: value });
            }}
            value={state.descriptionFa}
          />
        </div>
        <p className="my-4">Answer Type </p>
        <div className="flex w-full  flex-col items-start justify-start gap-4">
          <RatioGroup
            className="w-fit"
            value={state.answerType}
            setValue={(value) => {
              dispatch({ type: "setAnswerType", payload: value });
            }}
          >
            <RatioButton id={"one"} text="One" />
            <RatioButton id={"multi"} text="Multi" />
            <RatioButton id={"text"} text="Text" />
          </RatioGroup>
          {state.answerType === "text" && (
            <>
              <p>Answer Text </p>
              <div className="flex w-full justify-between gap-x-4">
                <TextInputLegend
                  ref={textAnswerEnRef}
                  placeholder={"Answer"}
                  value={state.answerTextEn}
                  callback={(value) => {
                    dispatch({ type: "answerTextEn", payload: value });
                  }}
                />
                <TextInputLegend
                  dir="rtl"
                  ref={textAnswerFaRef}
                  placeholder={"پاسخ"}
                  value={state.answerTextFa}
                  callback={(value) => {
                    dispatch({ type: "setTextAnswerFa", payload: value });
                  }}
                />
              </div>
            </>
          )}
          {state.answerType === "multi" && (
            <RatioList
              setData={setData}
              type="multi"
              defaultAnswers={state.answersIndex}
              defaultListItems={state.answersArray}
              lastId={state.answersArray?.length}
            />
          )}
          { state.answerType === "one" &&  <RatioList
            setData={setData}
            type="one"
            defaultAnswers={state.answersIndex}
            defaultListItems={state.answersArray}
            lastId={state.answersArray?.length}
          />}
        </div>
      </form>
    </motion.div>
  );
}

export default CreateQuestion;
