import {useEffect, useState} from "react"
import "./projCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Ptags from "./pTags";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
// import checkAuth from "@/routes/auth/authCheck";
import checkAuth from "@/routes/auth/authCheck";


function ProjCard(props){
    const [width, setWidth] = useState(window.innerWidth)
    const [auth, setAuth] = useState(false)
    const flexRow = {flexDirection:"row"}
    const flexCol = {flexDirection:"column"}

    async function getLikes(){
        const res = await fetch(import.meta.env.VITE_BASEURL + "/api/projects/getlikes", {
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        console.log(data)
    }



    useEffect(()=>{
        function handleResize(){
            setWidth(window.innerWidth)
        }

        (async ()=>{
            await getLikes()
            const user = await checkAuth()
        })()
        window.addEventListener("resize", handleResize)
        return()=>{
            window.removeEventListener("resize", handleResize)
        }
    },[])

    return(<>
    <div className="cardWrap">
        <a href={props.link}>
            <div className="projCard" style={width<800?flexCol:flexRow}>
                <div className="projImage">
                    <img src={`${import.meta.env.VITE_BASEURL}/api/projects/projimage/`+props.imgSrc} alt="Project Picture" />
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
                </div>
            </div>
        </a>
        <div className="ratingIcon">
            <div className="ratingIconCont">
                <FavoriteIcon onClick={props.onLike} style={props.color}/>
                <div className="likeCount">0</div>
            </div>
            <div className="ratingIconCont">
                <CommentIcon />
                <div className="commentCount">0</div>
            </div>
        </div>
    </div>
    </>)
}

export default ProjCard;