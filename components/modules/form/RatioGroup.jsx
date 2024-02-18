import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

function RatioGroup({ children, value, setValue ,className=""}) {
  const theChildren = useMemo(()=>{
  return  children?.map((ratioButton,i) => {
        const newRatioButton = React.cloneElement(ratioButton, {
          selectedId: value,
          onClick: setValue,
          key:i
        });
        return newRatioButton;
      })}
  ,[children]);
  return <div className={twMerge("flex items-center gap-x-4",className)}>{theChildren}</div>;
}

export default RatioGroup;
