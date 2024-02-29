import { createPortal } from "react-dom";

function PopupFull({ children }) {

  return createPortal(
    <>
        
   <div className="fixed left-0 top-0  bottom-0 z-50 h-screen  w-screen overflow-x-hidden bg-zinc-800 p-4 ">
      {children}
    </div> 

    </>,
    document.body,
  );
}

export default PopupFull;
