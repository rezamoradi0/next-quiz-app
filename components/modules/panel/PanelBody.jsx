import { useRouter } from "next/router";
import ButtonAddPanelItem from "../form/ButtonAddPanelItem";
import PanelItem from "./PanelItem";

function PanelBody({ panelData }) {
  const router = useRouter();
  function newItemHandler() {
    router.push(`?${panelData.queryAddress}`);
  }
  if (!panelData?.data || panelData?.data?.length === 0) {
    return (
      <ButtonAddPanelItem
        onClick={newItemHandler}
        text={panelData?.name || "Item"}
      />
    );
  }

  return (
    <>
      {panelData?.data?.map((item, i) => {
        return <PanelItem data={item} key={i} text={item.name} />;
      })}
      <ButtonAddPanelItem
        onClick={newItemHandler}
        text={panelData?.name || "Item"}
      />
    </>
  );
}

export default PanelBody;
