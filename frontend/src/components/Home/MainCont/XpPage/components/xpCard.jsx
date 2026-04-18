import XpTags from "./tags";
import "./xpCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function XpCard(props){
    return(<><a href={props.link}>
            <div className="xpCard">
            <div>
                <p>{props.date}</p>
            </div>
            <div className="xpCardCont">
                <div className="xpDesc">
                    <p><span className="xpTitle">{props.workTitle} <span className="icon xpTitle"><ArrowOutwardIcon sx={{fontSize:16}} /></span></span></p>
                    <p>{props.desc}</p>
                </div>
                <div className="tagCont">
                    <XpTags tagname={props.tag}/> 
                </div>
            </div>
        </div>
        </a>
    </>)
}

export default XpCard;