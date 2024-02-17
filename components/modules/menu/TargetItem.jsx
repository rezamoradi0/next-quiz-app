function TargetItem({ item }) {
  const itemClose=item;
  itemClose.onDropRemove=true;
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text", JSON.stringify(itemClose))}
      onDragEnd={(e)=>console.log(e)}
      className=" cursor-pointer rounded-lg bg-zinc-700 px-4 py-2 transition-all duration-500 hover:bg-zinc-600 hover:pl-12"
    >
      {item.name}
    </div>
  );
}

export default TargetItem;
