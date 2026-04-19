import { useEffect, useState } from "react";
import XpTags from "./tags";
import "./xpCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function XpCard(props){
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(()=>{
        function handleResize(){
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleResize)
        return ()=>{
            window.removeEventListener("resize",handleResize)
        }
    },[])

    const flexRow = {flexDirection:"row"}
    const flexCol = {flexDirection:"column"}

    return(<>
        <a href={props.link}>
            <div className="xpCard" style={width<800?flexCol:flexRow}>
            <div className="xpDate">
                <p>{props.date}</p>
            </div>
            <div className="xpCardCont">
                <div className="xpDesc">
                    <p><span className="xpTitle">{props.workTitle} <span className="icon xpTitle"><ArrowOutwardIcon sx={{fontSize:16}} /></span></span></p>
                    <p className="xpP">{props.desc}</p>
                </div>
                <div className="tagCont">
                    {props.tag[0].length<=0?null:props.tag.map(item=>{
                        return <XpTags key={item} tagname={item}/> 
                    })}
                </div>
            </div>
        </div>
        </a>
    </>)
}

export default XpCard;