import { useRouter } from "next/router"
import Button from "./Button"

function ButtonBack({className="",text="Back"}) {
    const router=useRouter();
    return (
        <Button onClick={()=>{router.back()}} className={className} text={text}/>
    )
}

export default ButtonBack
