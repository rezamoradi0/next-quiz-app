import OriginItem from "./OriginItem";

function ItemsOrigin({ dataArray, header ,children}) {
  return (
    <div className="flex h-full grow w-full flex-col rounded-lg  border border-zinc-800 p-4">
      <div className="mb-3">{header}</div>
      <div className="flex h-full flex-col gap-4 ">
        {dataArray.map((item, i) => {
          return <OriginItem key={i} item={item} />;
        })}
      </div>
      {children}
    </div>
  );
}

export default ItemsOrigin;
