import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

const TextArea=forwardRef(function TextArea({tab,cols="30", rows="10",id ,dir="ltr" ,className="",onChange,value},ref) {
    
    return (
        <div  dir={dir}  className="flex flex-col grow-0  items-start justify-start w-full group overflow-hidden focus-within:border-sky-500 focus-within:border rounded-lg">
            {tab&&<label htmlFor={id} className="bg-zinc-700 p-4 text-gray-400 w-full group-focus-within:text-white">{tab}</label>}
            <textarea ref={ref} onChange={(e)=>{
                if(onChange)onChange(e.target.value);
            }}  name={id} id={id} cols={cols} rows={rows} value={value} className={twMerge("w-full resize-none bg-zinc-700  p-8 outline-none",className)} >
            
            </textarea>
        </div>
    )
});

export default TextArea
