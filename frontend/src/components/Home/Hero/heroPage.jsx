import { HOME_SECTIONS } from "../sections.js";
import "./heroPage.css"
import TitleName from "./TitleName/titleName";
import ContactIcon from "../../ContactBar/contactIcon/contactIcon";
import TheStack from "./TheStack/theStack";
import SubTitle from "./subTitle";
import PageMap from "./PageMap/pageMap";

import wuSprite from "../../../assets/Wukong_Big.png"
import useWindowWidth from "@/hooks/useWindowWidth.js"

function HeroPage({ size, mapActive = { active: null } }){
    const width = useWindowWidth()

    const bigList = HOME_SECTIONS.map(name => {
        return <PageMap key={name} name={name} active={mapActive.active === name}/>
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