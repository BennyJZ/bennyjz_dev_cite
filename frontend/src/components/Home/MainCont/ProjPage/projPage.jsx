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
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME Like a really long name, with a lot of syllables bliky on my dickydwa dwakl lak lkms lkmsd lkam lkmdlsa "} desc={"THE DESCRIPTION OF THE PROEJECT SPLit a lorem ipsum smokey pokey how come you dont know hoe to talk to people, wha the helloo ,dw aonm Lorem Ipsum is filler text used in printing and design to demonstrate graphic elements (layouts, fonts) without using meaningful content. Derived from Cicero's 45 BC text De Finibus Bonorum et Malorum, it has been the industry standard dummy text since the 1500s. It resembles Latin but is nonsensical, preventing distraction from Lorem Ipsum is filler text used in printing and design to demonstrate graphic elements (layouts, fonts) without using meaningful content. Derived from Cicero's 45 BC text De Finibus Bonorum et Malorum, it has been the industry standard dummy text since the 1500s. It resembles Latin but is nonsensical, preventing distraction from Lorem Ipsum is filler text used in printing and design to demonstrate graphic elements (layouts, fonts) without using meaningful content. Derived from Cicero's 45 BC text De Finibus Bonorum et Malorum, it has been the industry standard dummy text since the 1500s. It resembles Latin but is nonsensical, preventing distraction from"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
            <ProjCard imgSrc={wuSprite} link={"https://google.com"} title={"PROJECT NAME"} desc={"THE DESCRIPTION OF THE PROEJECT"} tag={["Name","Of","the","tags"]}/>
        </div>
    </div>
    </>)
}

export default ProjPage;