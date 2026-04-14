import "./heroPage.css"
import TitleName from "./TitleName/titleName";
import ContactIcon from "../../ContactBar/contactIcon/contactIcon";
import MyStack from "./MyStack/myStack";

import wuSprite from "../../../assets/Wukong_Big.png"
import NodeJs from "../../../assets/NodeJs.svg"
import psql from "../../../assets/psql.svg"
import react from "../../../assets/react.svg"
import rpi from "../../../assets/rpi.svg"
import vite from "../../../assets/vitejs.svg"

function HeroPage(){
    return(
        <>
        <div className="meCard">
            <div className="wuSpriteCont">
                <img src={wuSprite} alt="Sun Wukong pixel Sprite" className="wuSprite"/>
            </div>
            <TitleName />
            <ContactIcon />
            <p>
                <span>Full Stack Developer</span>
            </p>
            <p>
                I build production ready applications with:
            </p>
            <div className="theStack">
                <MyStack stack={NodeJs} name={"Node.js"}/>
                <MyStack stack={psql} name={"PostgreSQL"}/>
                <MyStack stack={react} name={"React"}/>
                <MyStack stack={vite} name={"Vite.js"}/>
                <p>This website is hosted on my: <MyStack stack={rpi} name={"RaspberryPi"}/></p>
            </div>
        </div>
        </>
    )
}

export default HeroPage;