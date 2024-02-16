function ItemsOrigin({ dataArray, header }) {
  return (
    <div className="flex flex-col border-zinc-800 border rounded-lg  p-4 h-full grow">
      <div>{header}</div>
      <div className="flex flex-col gap-4 h-full">
        {dataArray.map((item,i) => {
          return <div draggable  key={i} className=" bg-zinc-700 px-4 py-2 rounded-lg cursor-pointer hover:pl-12 transition-all duration-500 hover:bg-zinc-600" >{item.name}</div>;
        })}
      </div>
    </div>
  );
}

export default ItemsOrigin;

