import { useState } from "react";

function ItemsTarget({ dataArray, header }) {
    const [listArray,setListArray]=useState(dataArray);
  return (
    <div className="flex grow flex-col rounded-lg border  border-zinc-800 p-4">
      <div>{header}</div>
      <div
        onDrop={(e) => {
          console.log("TEST DROP");
        }}
        onDragOver={(e)=> {console.log(e.target.style.offsetTop); e.preventDefault()}}

        className="flex flex-col gap-4 h-full grow"
      >
        {listArray.map((item, i) => {
          return (
            <div
              key={i}
              className=" cursor-pointer rounded-lg bg-zinc-700 px-4 py-2 transition-all duration-500 hover:bg-zinc-600 hover:pl-12"
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsTarget;
