import { createPortal } from "react-dom";
import {motion} from "framer-motion"
function PopupFull({ children }) {

  return createPortal(
    <>
        
   <motion.div animate={{width:["0vw","100vw"] ,maxHeight:["0vh","100vh"] ,left:["50%","0%"],top:["50%","0%"],transition:{duration:0.2}}}  className="fixed w-0 max-h-0 bottom-0 z-50  overflow-x-hidden bg-zinc-800 p-4">
      {children}
    </motion.div> 

    </>,
    document.body,
  );
}

export default PopupFull;
