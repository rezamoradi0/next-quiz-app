import CreateQuestion from "@/components/templates/createItems/CreateQuestion";
import { useState } from "react";
import PopupFull from "../popup/PopupFull";
import { usePanelBody } from "@/context/PanelBodyContext";
function PanelQuestionItem({ item }) {
  const [open, setOpen] = useState(false);
  const {getPanelItems}=usePanelBody();
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
        <span className="flex flex-col ">
          <div className="flex flex-col items-start ">
            <p>Tag </p>
            <span className="mx-2 inline-block h-0 w-px transition-all  duration-100 group-hover:h-1 group-hover:duration-500"></span>
       
            <p className=" overflow-clip text-ellipsis whitespace-nowrap">
              Description : {item.descriptionEn}
            </p>
            <span className="mx-2 inline-block h-0 w-px transition-all duration-100 group-hover:h-1 group-hover:duration-500"></span>
            <p>AnswerType : {item.answerType} </p>
    
          </div>

          <span className="block  h-1 w-0 border-blue-300  transition-all group-hover:w-full group-hover:border-b group-hover:duration-1000"></span>
        </span>
      </div>
      {open && (
        <PopupFull>
          <CreateQuestion defaultData={item} backOnClick={backHandler} onDeleteItem={getPanelItems}/>
        </PopupFull>
      )}
    </>
  );
}

export default PanelQuestionItem;
