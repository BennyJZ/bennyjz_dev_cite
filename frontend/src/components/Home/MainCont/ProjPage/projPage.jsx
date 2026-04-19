import "./projPage.css"
import ProjCard from "./components/projCards";
import {useState, useEffect} from "react"

import wuSprite from "../../../../assets/chinaT.png"

function ProjPage(){
    const [projActive, setProjActive] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(()=>{
        function handleResize(){
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        return ()=>{
            removeEventListener("resize",handleResize)
        }
    },[])

    return(<>
    <div className="projWrap">
        <div className={`projCont ${width<800?null:"projActCont"}`}>

            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
        </div>
    </div>
    </>)
}

export default ProjPage;