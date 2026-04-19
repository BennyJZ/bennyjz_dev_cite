import {useEffect, useState} from "react"
import "./projCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Ptags from "./pTags";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

function ProjCard(props){
    const [width, setWidth] = useState(window.innerWidth)
    const flexRow = {flexDirection:"row"}
    const flexCol = {flexDirection:"column"}

    

    useEffect(()=>{
        function handleResize(){
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)
        return()=>{
            window.removeEventListener("resize", handleResize)
        }
    },[])
    return(<>
        <a href={props.link}>
            <div className="projCard" style={width<800?flexCol:flexRow}>
                <div className="projImage">
                    <img src={props.imgSrc} alt="Project Picture" />
                </div>
                <div className="projCardWrap">
                    <div className="projCardCont">
                        <div className="projDesc">
                            <p><span className="projTitle">{props.title} <span className="icon projTitle"><ArrowOutwardIcon sx={{fontSize:16}} /></span></span></p>
                            <p className="projP">{props.desc}</p>
                        </div>
                        <div className="tagCont">
                            {props.tag[0].length<=0?null:props.tag.map(item=>{
                                return <Ptags key={item} tagname={item}/> 
                            })}
                        </div>
                    </div>
                    <div className="ratingIcon">
                        <FavoriteIcon /> <CommentIcon />
                    </div>
                </div>
            </div>
        </a>
    </>)
}

export default ProjCard;