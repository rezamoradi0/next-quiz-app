import { twMerge } from "tailwind-merge";
import Button from "./Button";

function ButtonAddPanelItem({ text = "item", className = "",onClick=()=>{} }) {
  return (
    <Button
      text={`+ Add New ${text}`}
      className={twMerge("bg-green-300 hover:bg-gray-50 w-fit", className)}
        onClick={onClick}
    />
  );
}

export default ButtonAddPanelItem;
