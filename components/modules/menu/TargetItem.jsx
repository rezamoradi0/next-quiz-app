import { motion } from "framer-motion";
function TargetItem({ item, removeHandler = () => {} }) {
  const itemClose = item;
  itemClose.onDropRemove = true;
  return (
    <div
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData("text", JSON.stringify(itemClose))
      }
      onDragEnd={(e) => console.log(e)}
      className="group flex cursor-pointer justify-between rounded-lg bg-zinc-700 px-4 py-2 transition-all duration-500 hover:bg-zinc-600 "
    >
      <span>{item.name}</span>
      <span>
        <span
          className="text-xs mx-4 h-12 transition-all hover:bg-red-600 w-12 rounded-lg bg-red-400 p-1 text-gray-100 opacity-0 group-hover:opacity-100"
          onClick={removeHandler}
        >
          Remove
        </span>
      </span>
    </div>
  );
}

export default TargetItem;
