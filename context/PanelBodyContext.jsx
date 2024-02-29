const { createContext, useContext } = require("react");

const PanelBodyContext = createContext();

function PanelBodyProvider({ children, getPanelItems }) {
  return (
    <PanelBodyContext.Provider value={{ getPanelItems }}>
      {children}
    </PanelBodyContext.Provider>
  );
}
function usePanelBody() {
  const context = useContext(PanelBodyContext);
  if (context === undefined) {
    throw new Error("PanelBodyContext Should Use Inside Children");
  }
  return context;
}

export { PanelBodyProvider, usePanelBody };
