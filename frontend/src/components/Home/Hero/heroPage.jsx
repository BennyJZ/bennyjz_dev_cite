import "./heroPage.css"
import TitleName from "./TitleName/titleName";
import ContactIcon from "../../ContactBar/contactIcon/contactIcon";
import TheStack from "./TheStack/theStack";
import SubTitle from "./subTitle";

import wuSprite from "../../../assets/Wukong_Big.png"
import { useEffect, useState } from "react";

function HeroPage(props){
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(()=>{
        window.addEventListener("resize",handleResize);
    },[])

    function handleResize(){
        setWidth(window.innerWidth)
    }

    return(
        <>
        <div className="meCard" style={props.size}>
            <div className="wuSpriteCont">
                <img src={wuSprite} alt="Sun Wukong pixel Sprite" className="wuSprite"/>
            </div>
            <TitleName />
            {(width<800?null:<ContactIcon />)}
            <div className="theStackWrapper">
                <SubTitle />
                <TheStack />
            </div>
        </div>
        </>
    )
}

export default HeroPage;