function PanelItem({ text = "Panel Item", className = "" }) {
  return (
    <div
      className="group w-full cursor-pointer rounded-xl bg-transparent p-4
     font-medium text-gray-50 transition-all duration-500 hover:bg-blue-500 hover:pl-8"
    >
      <span className="inline-block">
        {" "}
        {text}{" "}
        <span className="block  h-1 w-0 border-blue-300  transition-all group-hover:w-full group-hover:border-b group-hover:duration-1000"></span>
      </span>
    </div>
  );
}

export default PanelItem;
