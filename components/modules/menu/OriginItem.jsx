function OriginItem({ item,onClickSend=true,itemType }) {
  return (
    <div
      onClick={()=>{
        if(onClickSend){
          //Here Context Need
        }
      }}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text", JSON.stringify(item))}
      className=" cursor-pointer rounded-lg bg-zinc-700 px-4 py-2 transition-all
       duration-500 hover:bg-zinc-600 hover:pl-12 w-full "
    >
      {itemType==="question"&&<span>
        question</span>}
        {itemType==="description"&&<span>
        description</span>}
    </div>
  );
}

export default OriginItem;
