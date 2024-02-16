import { useCallback, useEffect, useRef, useState } from "react";

function TextInputLegend({
  placeholder = "placeholder",
  dir = "ltr",
  callback,
}) {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const clickHandler=useCallback(()=> {
   inputRef.current.focus();
  },[])
  useEffect(() => {
    if (callback) {
      callback(callback);
    }
  }, [text]);
  return (
    <div
      dir={dir}
      onClick={clickHandler}
      className={`${text || isFocus ? "flex-col justify-end" : "justify-between"} ${isFocus ? " border border-sky-500" : ""} relative flex  h-16  grow items-start  overflow-hidden rounded-xl bg-zinc-700   p-4 `}
    >
      <span
        className={`${isFocus || (text && !isFocus) ? " left-2 top-2 translate-y-0 text-xs text-white " : ""}  absolute left-2 top-1/2 h-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 rtl:right-2`}
      >
        {placeholder}
      </span>
      <input
        ref={inputRef}
        type="text"
        className={`${isFocus || (text && !isFocus) ? "h-1/2" : "h-full"} relative  border-none bg-transparent outline-none`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
}

export default TextInputLegend;
