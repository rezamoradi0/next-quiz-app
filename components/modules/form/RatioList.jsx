import { useEffect, useRef, useState } from "react";
import RatioGroup from "./RatioGroup";
import RatioButton from "./RatioButton";
import TextInputLegend from "./TextInputLegend";
import Button from "./Button";
function RatioList({type="one" ,setData,defaultListItems,defaultAnswers,lastId}) {
  const [listItems, setListItems] = useState(defaultListItems||[]);
  const [answersIndex, setAnswersId] = useState(defaultAnswers||[]);
  const answerTextEnRef = useRef(null);
  const answerTextFaRef = useRef(null);
  const lastIdRef=useRef(lastId||0);
  const [clearTexts, setClearTexts] = useState(0);
  console.log(listItems);
  useEffect(()=>{
   setParentData();
  },[lastIdRef,answersIndex,listItems]);
  function setParentData(){
    if(type==="one"||type==="multi")
    {
      setData({
        type,
        answersIndex,
        listItems,
      })
    }else if(type==="text"){
      setData({
        type
      })
    }
  }
  
  function selectItemHandler(id){
    
    if(type=="multi"){
      const answerIndex=  answersIndex.findIndex(item=>item==id);
      if(answerIndex==-1){
        setAnswersId([...answersIndex,id]);
      }else {
        setAnswersId([...answersIndex.toSpliced(answerIndex,1)])
      }
    }else if(type==="one"){
      setAnswersId([id])
    }
  }
  function addItemHandler() {
    if (
      answerTextFaRef.current.value.trim().length == 0 ||
      answerTextEnRef.current.value.trim().length == 0
    ) {
      return;
    }
    const id = lastIdRef.current;
    lastIdRef.current+=1;
    setListItems([
      ...listItems,
      {
        id: id,
        answerFa: answerTextFaRef.current.value,
        answerEn: answerTextEnRef.current.value,
      },
    ]);

     setClearTexts((perv) => perv+1 );
  }
  function removerItemHandler(id) {
    setListItems(listItems.filter((item)=>{
      return item.id!==id;
    }))
  }
  useEffect(()=>{
    setListItems(defaultListItems||[]);
    setAnswersId(defaultAnswers||[]);
  },[defaultListItems])
console.log(answersIndex);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex grow justify-between">
        <span> Answer List</span>
        <span> لیست پاسخ ها</span>
      </div>

      <div className="flex w-full flex-row-reverse justify-between">
        <RatioGroup
          className="flex flex-col items-end gap-y-4"
          value={answersIndex}
          setValue={selectItemHandler}
        >
          {listItems?.map((item,i) => {
            return (
              <RatioButton
                id={item.id}
                text={answersIndex?.findIndex(answer=>answer==item.id)!==-1 ? "correct" : "wrong"}
                className={answersIndex?.findIndex(answer=>answer==item.id)!==-1 ? "" : "bg-red-500"}
              key={i}
                />
            );
          })}
        </RatioGroup>
        <div className="flex w-full flex-col gap-4 px-4">
          {listItems?.map((item,i) => {
            return (
              <div key={i} className="group relative flex h-12 w-full items-center justify-start gap-x-8">
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
