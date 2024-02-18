import { useCallback, useEffect, useRef, useState } from "react";
import RatioGroup from "./RatioGroup";
import RatioButton from "./RatioButton";
import TextInputLegend from "./TextInputLegend";
import Button from "./Button";

function RatioList() {
  const [listItems, setListItems] = useState([]);
  const [answerId, setAnswerId] = useState(false);
  const answerTextEnRef = useRef(null);
  const answerTextFaRef = useRef(null);

  const [clearTexts, setClearTexts] = useState(false);
  function addItemHandler() {
    if (
      answerTextFaRef.current.value.trim().length == 0 ||
      answerTextEnRef.current.value.trim().length == 0
    ) {
      return;
    }
    const id = listItems.length;
    setListItems([
      ...listItems,
      {
        id: id,
        answerFa: answerTextFaRef.current.value,
        answerEn: answerTextEnRef.current.value,
      },
    ]);

    setClearTexts((perv) => !perv);
  }
  function removerItemHandler(id) {
    setListItems(listItems.filter((item)=>{
      return item.id!==id;
    }))
  }
  useEffect(() => {
    console.log(listItems);
  }, [listItems]);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex grow justify-between">
        <span> Answer List</span>
        <span> لیست پاسخ ها</span>
      </div>

      <div className="flex w-full flex-row-reverse justify-between">
        <RatioGroup
          className="flex flex-col items-end gap-y-4"
          value={answerId}
          setValue={setAnswerId}
        >
          {listItems?.map((item) => {
            return (
              <RatioButton
                id={item.id}
                text={answerId == item.id ? "correct" : "wrong"}
                className={answerId == item.id ? "" : "bg-red-500"}
              />
            );
          })}
        </RatioGroup>
        <div className="flex w-full flex-col gap-4 px-4">
          {listItems?.map((item) => {
            return (
              <div className="group relative flex h-12 w-full items-center justify-start gap-x-8">
                <span> {item.answerEn}</span>
                <span> {item.answerFa}</span>
                <span
                  className=" ml-auto hidden group-hover:inline  cursor-pointer rounded-lg bg-red-500 p-2 text-xs "
                  onClick={() => {
                    removerItemHandler(item.id);
                  }}
                >
                  Remove
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {listItems.length < 4 && (
        <div className="flex w-full items-center justify-between gap-4">
          <TextInputLegend
            placeholder="Answer"
            ref={answerTextEnRef}
            clear={clearTexts}
          />
          <TextInputLegend
            placeholder="پاسخ"
            ref={answerTextFaRef}
            dir="rtl"
            clear={clearTexts}
          />
          <Button text="+ Add" onClick={addItemHandler} />
        </div>
      )}
    </div>
  );
}

export default RatioList;
