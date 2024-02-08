import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
function TextInput({
  minLength = false,
  type = "text",
  maxLength = false,
  placeholder = "",
  className = "",
  required = false,
  name,
  value,
  onChange=()=>{}
}) {

  return (
    <input
      placeholder={placeholder}
      minLength={minLength}
      type={type}
      maxLength={maxLength}
      value={value}
      required={required}
      name={name}
    
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className={twMerge(
        "h-10 w-72 rounded-lg py-1 border-gray-700 bg-cyan-700 px-2 outline-none placeholder:text-gray-300 valid:border-4  valid:border-cyan-700 focus:border-2 focus:bg-cyan-500",
        className,
      )}
    />
  );
}

export default TextInput;
