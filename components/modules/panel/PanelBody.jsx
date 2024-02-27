import { useRouter } from "next/router";
import ButtonAddPanelItem from "../form/ButtonAddPanelItem";
import PanelItem from "./PanelItem";
import { useEffect, useState } from "react";
import { getItems } from "@/api/services/adminServices";
function PanelBody({ panelData }) {
  const router = useRouter();
  const [listItems, setListItems] = useState(panelData?.data || []);
  const [listPageNumber, setListPageNumber] = useState(1);
  function newItemHandler() {
    router.push(`?${panelData.queryAddress}`);
  }
  async function getPanelItems() {
    setListItems([])
    const response = await getItems(panelData.name, listPageNumber);
    const data = await response.json();
    if (response.status == 200) {
      const arrayOfChildren = Object.values(data);
      setListItems(arrayOfChildren);
    } else {
      console.log("SomeThing is Wrong ");
    }
  }
  useEffect(() => {

    getPanelItems();
  }, [panelData.name]);

    return (
      <>
          <ButtonAddPanelItem
            onClick={newItemHandler}
            text={panelData?.name || "Item"}
          />
        {listItems?.map((item, i) => {
          return <PanelItem data={item} key={i} text={item.answerType} />;
        })}
        
      </>
    );
}

export default PanelBody;
