import { useState } from "react";
function TargetPlace({ onDropHandler, index, text = "+ Here" }) {
  const [isDragZone, setIsDragZone] = useState(false);

  return (
    <div
      onDrop={(event) => {
        setIsDragZone(false);
        onDropHandler(event, index);
        event.stopPropagation();
      }}
      onDragEnter={() => setIsDragZone(true)}
      onDragLeave={() => setIsDragZone(false)}
      className={`${isDragZone ? "h-10 border border-gray-200 " : "h-2 duration-75"}  flex w-full flex-col  items-center justify-center rounded-lg border-dashed bg-transparent transition-all duration-500`}
    >
     {isDragZone? text:""}
    </div>
  );
}

export default TargetPlace;
