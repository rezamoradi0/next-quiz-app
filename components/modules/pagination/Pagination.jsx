import { twMerge } from "tailwind-merge";
import Button from "../form/Button";
import { useEffect, useState } from "react";

function Pagination({
  defaultPage = 1,
  lastPage = 1,
  onChange,
  className = "",
}) {
  const [pageNumber, setPageNumber] = useState(defaultPage);
  function onChangeHandler(count) {
    if ((pageNumber > 1 && count < 0) || (pageNumber < lastPage && count > 0)) {
      setPageNumber((perv) => {
        return perv + count;
      });
    }
  }
  useEffect(()=>{
    onChange(pageNumber);
   
  },[pageNumber])
  return (
    <div className={twMerge("flex items-center justify-evenly", className)}>
      <Button
        className={`${pageNumber===1?"bg-gray-500":""} mx-2 h-fit p-1 text-sm`}
        text="perv"
        onClick={() => {
          onChangeHandler(-1);
        }}
      />
      {pageNumber}
      <Button
        className={`${pageNumber===lastPage?"bg-gray-500":""} mx-2 h-fit p-1 text-sm`}
        text="next"
        onClick={() => {
          onChangeHandler(1);
        }}
      />
    </div>
  );
}

export default Pagination;
