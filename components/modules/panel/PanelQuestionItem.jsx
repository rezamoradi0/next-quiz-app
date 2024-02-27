import CreateQuestion from "@/components/templates/createItems/CreateQuestion";
import { useState } from "react";
import PopupFull from "../popup/PopupFull";

function PanelQuestionItem({ item }) {

  const [open, setOpen] = useState(false);
  function backHandler() {
    setOpen(false);
  }
  return (
    <>
      <div
        onClick={() => {
          setOpen((perv) => !perv);
        }}
        className="group w-full cursor-pointer rounded-xl bg-transparent p-4
     font-medium text-gray-50 transition-all duration-500 hover:bg-blue-500 hover:pl-8"
      >
        <span className="inline-block">
           <p>
            Description : {item.descriptionEn}
          </p>
          <p>
          AnswerType : {item.answerType}{" "}
          </p>
          <span className="block  h-1 w-0 border-blue-300  transition-all group-hover:w-full group-hover:border-b group-hover:duration-1000"></span>
        </span>
      </div>
      {open && (
        <PopupFull>
          <CreateQuestion  defaultData={item} backOnClick={backHandler}/>
        </PopupFull>
      )}
    </>
  );
}

export default PanelQuestionItem;
