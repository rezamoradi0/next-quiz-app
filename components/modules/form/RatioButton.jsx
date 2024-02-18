import Button from "./Button";

function RatioButton({ id, text, selectedId, onClick,selectedClassName="bg-green-300 ",className="" }) {
  return (
    <Button
      className={`${id == selectedId ? selectedClassName : ""} ${className}`}
      text={text}
      onClick={() => {
        onClick(id);
      }}
    />
  );
}

export default RatioButton;
