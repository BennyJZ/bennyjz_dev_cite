import XpTags from "./tags";
import "./xpCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function XpCard(props){
    return(<><a href={props.link}>
            <div className="xpCard">
            <div className="xpDate">
                <p>{props.date}</p>
            </div>
            <div className="xpCardCont">
                <div className="xpDesc">
                    <p><span className="xpTitle">{props.workTitle} <span className="icon xpTitle"><ArrowOutwardIcon sx={{fontSize:16}} /></span></span></p>
                    <p>{props.desc}</p>
                </div>
                <div className="tagCont">
                    {props.tag[0].length<=0?null:props.tag.map(item=>{
                        return <XpTags tagname={item}/> 
                    })}
                </div>
            </div>
        </div>
        </a>
    </>)
}

export default XpCard;