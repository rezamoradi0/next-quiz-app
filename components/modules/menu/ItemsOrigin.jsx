import { twMerge } from "tailwind-merge";
import OriginItem from "./OriginItem";

function ItemsOrigin({ dataArray, header, children, className = "",itemType }) {
  return (
    <div
      className={twMerge(
        "flex  w-full grow flex-col rounded-lg  border border-zinc-800 p-4",
        className,
      )}
    >
      <div className="mb-3">{header}</div>
      <div className="flex h-full flex-col gap-4 ">
        {dataArray?.map((item, i) => {

          return <OriginItem key={i} item={item} itemType={itemType}/>;
        })}
      </div>
      {children}
    </div>
  );
}

export default ItemsOrigin;
