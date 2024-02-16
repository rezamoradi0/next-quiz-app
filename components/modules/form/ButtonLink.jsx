import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useRouter } from "next/router";

function ButtonLink({ text="ButtonLink",className = "" ,href}) {
    const router=useRouter();
  return (
    <Button onClick={()=>{
       if(href) router.push(href);
    }}
      text={text}
      className={twMerge(
        "bg-cyan-600 text-white hover:bg-white hover:text-black",
        className,
      )}
    />
  );
}

export default ButtonLink;
