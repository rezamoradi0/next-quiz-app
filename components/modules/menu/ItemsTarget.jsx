import { useCallback, useEffect, useRef, useState } from "react";
import TargetItem from "./TargetItem";
import TargetPlace from "./TargetPlace";
import PopupAlert from "../popup/PopupAlert";

function ItemsTarget({ dataArray, header }) {
  const [listArray, setListArray] = useState(dataArray);
  const [popup, setPopup] = useState(false);
  const dropHandler = useCallback(
    (event, index) => {
      const itemData = JSON.parse(event.dataTransfer.getData("text"));
      const itemIndex = listArray.findIndex((item) => item.id == itemData.id);
      console.log("itemIndex ", itemIndex);
      console.log("index ", index);
      console.log("itemData.onDropRemove ", itemData.onDropRemove);
      if (itemIndex > -1 && itemData.onDropRemove && index >= 0) {
        const newListArray = listArray.toSpliced(itemIndex, 1);
        newListArray.splice(index, 0, itemData);
        setListArray(newListArray);
      }
      else if(itemIndex>-1 && itemData.onDropRemove && index!=0 &&!index){
        const newListArray = listArray.toSpliced(itemIndex, 1);
        newListArray.splice(newListArray.length, 0, itemData);
        setListArray(newListArray);
      }
      else if (itemIndex > -1) {
        setPopup("Duplicated Item !!");
        return;
      } else if (index >= 0) {
        setListArray([
          ...listArray.slice(0, index),
          itemData,
          ...listArray.slice(index),
        ]);
      } else {
        setListArray([...listArray, itemData]);
      }
      listArray.forEach((item) => {
        console.log("item :", item);
      });
    },
    [listArray],
  );
  const removeHandler=(id)=>{
    const itemIndex=listArray.findIndex((item)=>{
      return item.id==id;
    })
    setListArray(listArray.toSpliced(itemIndex,1));
  }
  useEffect(() => {
    console.log("HERE");
    if (!popup) {
      return;
    } else {
      setTimeout(() => {
        setPopup(false);
      }, 1600);
    }
  }, [popup]);
  return (
    <div className="flex w-full  grow flex-col rounded-lg border  border-zinc-800 p-4 pb-0 last:mb-12 ">
      {popup && <PopupAlert text={popup} />}
      <div>{header}</div>
      <div
        onDrop={(event) => {
          dropHandler(event);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        className="flex h-full grow flex-col gap-y-1"
      >
        {listArray.map((item, i) => {
          return (
            <>
              {" "}
              <TargetPlace
                index={i}
                key={crypto.randomUUID()}
                onDropHandler={dropHandler}
              />
              <TargetItem key={crypto.randomUUID()} item={item} removeHandler={removeHandler}/>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsTarget;
