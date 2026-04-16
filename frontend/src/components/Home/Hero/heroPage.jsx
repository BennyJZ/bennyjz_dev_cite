import "./heroPage.css"
import TitleName from "./TitleName/titleName";
import ContactIcon from "../../ContactBar/contactIcon/contactIcon";
import TheStack from "./TheStack/theStack";
import SubTitle from "./subTitle";
import PageMap from "./PageMap/pageMap";

import wuSprite from "../../../assets/Wukong_Big.png"
import { useEffect, useState } from "react";

function HeroPage({ size, mapActive = { active: null } }){
    const [width, setWidth] = useState(window.innerWidth)
    const [mainList, setMainList] = useState([])
    const [mapOn, setMapOn] = useState(false)

    function styleReset(){
        setMainList(prev=>{
            return prev.map(item=>{
                return item.style.color = "green"
            })
        })
    }

    useEffect(()=>{
        const main = document.querySelector(".MainCont");
        if (!main) return;
        setMainList(Array.from(main.children))

        window.addEventListener("resize",handleResize);

        return()=>{
            window.removeEventListener("resize",handleResize)
        }
        
    },[])

    function handleResize(){
        setWidth(window.innerWidth)
    }

    const bigList = mainList.map(item=>{
        return <PageMap key={item.firstChild.innerText} name={item.firstChild.innerText} active={(mapActive.active == item.firstChild.innerText)}/>
    })

    return(
        <>
        <div className="meCard" style={size}>
            <div className="wuSpriteCont">
                <img src={wuSprite} alt="Sun Wukong pixel Sprite" className="wuSprite"/>
            </div>
            <TitleName />
            {(width<800?null:<ContactIcon />)}
            <div className="theStackWrapper">
                <SubTitle />
                <TheStack checkCollapse={(mapActive.active?false:true)}/>
            </div>
            <div className="mapWrapper">
                    {width<800?null:bigList}
            </div>
        </div>
        </>
    )
}

export default HeroPage;