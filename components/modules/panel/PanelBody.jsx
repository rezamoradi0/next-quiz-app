import { useRouter } from "next/router";
import ButtonAddPanelItem from "../form/ButtonAddPanelItem";
import PanelItem from "./PanelItem";
import { useEffect, useState } from "react";
import { getItems } from "@/api/services/adminServices";
import PanelQuestionItem from "./PanelQuestionItem";
import Button from "../form/Button";
import {PanelBodyProvider} from "@/context/PanelBodyContext";
import Pagination from "../pagination/Pagination";
function PanelBody({ panelData }) {
  const router = useRouter();
  const [listItems, setListItems] = useState(panelData?.data || []);
  const [listPageNumber, setListPageNumber] = useState(1);
  const [getUpdateTrigger, setGetUpdateTrigger] = useState(false);

  const [lastPageNumber,setLastPageNumber]=useState(1);
  function newItemHandler() {
    router.push(`?${panelData.queryAddress}`);
  }
  async function getPanelItems() {
    setListItems([]);
    const response = await getItems(panelData.name, listPageNumber);
    const data = await response.json();
  
    if (response.status == 200) {
      setLastPageNumber(data.pageNumber);
      const arrayOfChildren = Object.values(data.items);
      setListItems(
        arrayOfChildren.map((item) => {
          let newItem = item;
          newItem.answersArray = JSON.parse(newItem.answersArray);
          newItem.answersIndex = JSON.parse(newItem.answersIndex);
          return newItem;
        }),
      );
   
    } else {
      console.log("SomeThing is Wrong ");
    }
  }

  useEffect(() => {
    getPanelItems();
  }, [panelData.name, getUpdateTrigger,listPageNumber]);

  return (
    <PanelBodyProvider getPanelItems={getPanelItems}>
     
        <div className="flex w-full justify-between">
          <ButtonAddPanelItem
            onClick={newItemHandler}
            text={panelData?.name || "Item"}
          />
          <Pagination lastPage={lastPageNumber} onChange={setListPageNumber}  className={"ml-auto mr-2"} />
          <Button
            onClick={() => {
              setGetUpdateTrigger(!getUpdateTrigger);
            }}
            text="Reload"
          />
        </div>
        <div className="w-1/2">
          {listItems?.map((item, i) => {
            if (panelData?.name.toLowerCase() === "question") {
              return <PanelQuestionItem item={item} key={i} />;
            } else {
              return <PanelItem data={item} key={i} text={item.name} />;
            }
          })}
        </div>
      
    </PanelBodyProvider>
  );
}

export default PanelBody;
