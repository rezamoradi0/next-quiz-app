import { useEffect, useReducer, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

function menuReducer(state, action) {
  switch (action.type) {
    case "selectMenu":
      return { ...state, selectedItems: action.selectedIndex };
    default:
      return state;
  }
}
const initialState = {
  selectedItems: 0,
};
function FloatMenu({ menuItems ,callBack=()=>{} ,floatClassName=""}) {
  const [firstRender, setFirstRender] = useState(true);
  const [menuState, dispatch] = useReducer(menuReducer, initialState);
  const menuItemsRef = useRef(new Array());
  const floatingItemRef = useRef();

  useEffect(() => {
    function floatHandler() {
      floatingItemRef.current.style.height =
        menuItemsRef.current[menuState.selectedItems].offsetHeight + "px";
      floatingItemRef.current.style.width =
        menuItemsRef.current[menuState.selectedItems].offsetWidth + "px";
      floatingItemRef.current.style.left =
        menuItemsRef.current[menuState.selectedItems].offsetLeft + "px";
      floatingItemRef.current.style.top =
        menuItemsRef.current[menuState.selectedItems].offsetTop + "px";
    }
    if (firstRender) {
      setTimeout(() => {
        floatHandler();
      }, 100);
      setFirstRender(false);
    } else {
      floatHandler();
    }
  }, [menuState.selectedItems]);
  return (
    <ul className="relative my-8 flex  items-center justify-start gap-x-6 px-4">
      {menuItems.map((item, i) => {
        return (
          <li
            ref={(itemElement) => {
              return (menuItemsRef.current[i] = itemElement);
            }}
            key={i}
            onClick={() => {
              callBack(item);
              dispatch({ type: "selectMenu", selectedIndex: i });
            }}
            className={`${menuState.selectedItems === i ? " text-gray-50" : "text-gray-400 hover:bg-gray-700 transition-colors duration-200"} z-10  cursor-pointer rounded-full bg-transparent px-5  py-2 `}
          >
            {item.name}
          </li>
        );
      })}
      <span
        className={twMerge("absolute z-0 rounded-full  bg-sky-600 duration-700",floatClassName)}
        ref={floatingItemRef}
      ></span>
    </ul>
  );
}

export default FloatMenu;
