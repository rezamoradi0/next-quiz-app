function TextArea({tab,cols="30", rows="10",id ,dir="ltr"}) {
    
    return (
        <div  dir={dir}  className="flex flex-col grow-0  items-start justify-start w-full group overflow-hidden focus-within:border-sky-500 focus-within:border rounded-lg">
            {tab&&<label htmlFor={id} className="bg-zinc-700 p-4 text-gray-400 w-full group-focus-within:text-white">{tab}</label>}
            <textarea name={id} id={id} cols={cols} rows={rows} className="w-full bg-zinc-700 min-h-44 p-8 outline-none" ></textarea>
        </div>
    )
}

export default TextArea
