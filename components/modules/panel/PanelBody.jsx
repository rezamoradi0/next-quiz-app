import { useRouter } from "next/router";
import ButtonAddPanelItem from "../form/ButtonAddPanelItem";
import PanelItem from "./PanelItem";
import { useEffect, useState } from "react";
import { getItems } from "@/api/services/adminServices";
import PanelQuestionItem from "./PanelQuestionItem";
import Button from "../form/Button";
import { PanelBodyProvider } from "@/context/PanelBodyContext";
import Pagination from "../pagination/Pagination";
import PanelDescriptionItem from "./PanelDescriptionItem";
function PanelBody({ panelData ,children}) {
  const router = useRouter();
  const [listItems, setListItems] = useState(panelData?.data || []);
  const [listPageNumber, setListPageNumber] = useState(1);
  const [getUpdateTrigger, setGetUpdateTrigger] = useState(false);

  const [lastPageNumber, setLastPageNumber] = useState(1);
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
      console.log(data.items);
      switch (panelData.name.toLowerCase()) {
        case "question":
          setListItems(
            arrayOfChildren.map((item) => {
              let newItem = item;
              newItem.answersArray = JSON.parse(newItem.answersArray || null);
              newItem.answersIndex = JSON.parse(newItem.answersIndex || null);
              newItem.answerTextEn = newItem.answerTextEn || null;
              newItem.answerTextFa = newItem.answerTextFa || null;
              return newItem;
            }),
          );
          break;
        case "description":
          setListItems(
            arrayOfChildren.map((item) => {
              let newItem = item;
              newItem.textEn = newItem.textEn || null;
              newItem.textFa = newItem.textFa || null;
              newItem.tag = newItem.tag || null;
              return newItem;
            }),
          );
          break;
        default:
          break;
      }
    } else {
      setLastPageNumber(1);
      console.log("SomeThing is Wrong ");
    }
  }

  useEffect(() => {
    getPanelItems();
  }, [panelData.name, getUpdateTrigger, listPageNumber]);

  return (
    <PanelBodyProvider getPanelItems={getPanelItems}>
      {children}
      <div className="flex w-full justify-between">
        <ButtonAddPanelItem
          onClick={newItemHandler}
          text={panelData?.name || "Item"}
        />
        <Pagination
          lastPage={lastPageNumber}
          onChange={setListPageNumber}
          className={"ml-auto mr-2"}
        />
        <Button
          onClick={() => {
            setGetUpdateTrigger(!getUpdateTrigger);
          }}
          text="Reload"
        />
      </div>
      <div className="w-full">
        {listItems?.map((item, i) => {
          if (panelData?.name.toLowerCase() === "question") {
            return <PanelQuestionItem item={item} key={i} />;
          } else if (panelData?.name.toLowerCase() === "description") {
            return <PanelDescriptionItem item={item} key={i} />;
          } else {
            return <PanelItem data={item} key={i} text={item.name} />;
          }
        })}
      </div>
    </PanelBodyProvider>
  );
}

export default PanelBody;
