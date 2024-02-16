import { twMerge } from "tailwind-merge";
import {motion} from "framer-motion"
function Button({ text = "button", type = "button", className = "" ,onClick=()=>{}}) {
  return (
    <motion.button
    onClick={onClick}
    initial={{opacity:0,y:20,borderBottom:10}}
    animate={{opacity:1,y:0,borderBottom:10}}
    transition={{duration:0.2}}
    whileTap={{opacity:[0.8,1],y:[0,5] ,borderBottom:[12,1,10]}}
      className={twMerge(
        `h-12 rounded-lg  border-gray-500  bg-gray-100
         px-5 py-2 text-lg font-bold 
          text-zinc-950 shadow-sm shadow-gray-800`,
        className,
      )}
      type={type}
    >
      {text}
    </motion.button>
  );
}

export default Button;
