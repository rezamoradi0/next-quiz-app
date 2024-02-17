
import { createPortal } from "react-dom";
import {motion} from "framer-motion"
function PopupAlert( {text}) {
  return createPortal(
    <motion.div  initial={{opacity:0}} animate={{opacity:[0,1,0]}} transition={{duration:2}} className=" bg-red-500 absolute right-12 top-4 z-50 p-4 rounded-lg">{text}</motion.div>,
    document.body,
  );
}
export default PopupAlert;
