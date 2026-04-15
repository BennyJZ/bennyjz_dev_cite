import { useState } from "react";
import "./titleName.css"

function TitleName(){
    const [redHover, setRedHover] = useState("HoverTitle")



    return(
        <>
            <div className="nameTitleCont">
                <div className={redHover}></div>
                <h1 onMouseEnter={()=>{setRedHover("HoverTitle")}} className="Cn">
                    Benny Jan Zhuang
                </h1>
                <h1 onMouseEnter={()=>{setRedHover("HoverTitle ActiveCn")}} style={{width: "fit-content"}} className="Cn">
                    庄阳
                </h1>
            </div>
        </>
    )
}

export default TitleName;