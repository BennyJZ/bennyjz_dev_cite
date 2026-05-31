import {useEffect, useState} from "react"
import "./projCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Ptags from "./pTags";
import CommentSection from "./commentSection/commentSection";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
// import checkAuth from "@/routes/auth/authCheck";
import checkAuth from "@/routes/auth/authCheck";
import Collapse from '@mui/material/Collapse';



function ProjCard(props){
    const [width, setWidth] = useState(window.innerWidth)
    const [auth, setAuth] = useState(false)
    const [activeComment, setActiveComment] = useState(null)
    const [collapseComments, setCollapseComments] = useState(false)

    const flexRow = {flexDirection:"row"}
    const flexCol = {flexDirection:"column"}

    // IMPORTING SAMPLE COMMENTS:
    const sampleComment = [{
        commentId:"",
        username: "theUserName",
        content: "Hey there, how yall doing! Welcome to my cite :)",
        link:"https://google.com",
        createdAt:""
    },
    {
        commentId:"",
        username: "FAQ USER",
        content: "I DONt HAve ALINK PLS LEAVE ME ALOONE",
        link:null,
        createdAt:""
    },
    {
        commentId:"",
        username: "FAQ USER",
        content: "I DONt HAve ALINK PLS LEAVE ME ALOONE",
        link:null,
        createdAt:""
    }]


    function handleCollapseComments() {

        setCollapseComments(prev=>{
            if (prev){
                setActiveComment(null)
                return false
            } else {
                setActiveComment("activeComment")
                return true
            }
        })
    }


    useEffect(()=>{
        function handleResize(){
            setWidth(window.innerWidth)
        }

        (async ()=>{
            const user = await checkAuth()
            setAuth(user.authenticated)
        })()
        window.addEventListener("resize", handleResize)
        return()=>{
            window.removeEventListener("resize", handleResize)
        }
    },[])

    return(<>
    <div>
        <div className="cardWrap" style={collapseComments?{opacity:1}:null}>
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
                    <FavoriteIcon onClick={auth?props.onLike:null} style={props.color} className="theIcon" />
                    <div className="likeCount">{props.likeCounter}</div>
                </div>
                <div className="ratingIconCont">
                    <CommentIcon className="theIcon" onClick={handleCollapseComments} style={collapseComments?{color:"FFD700"}:null}/>
                    <div className="commentCount">{sampleComment.length}</div>
                </div>
            </div>
        </div>
        {/* REMEMBER AUTH CHECK, ONLY ALLOW USERS TO COMMENT */}
        <Collapse in={collapseComments}> 
            <div className="commentWrap">
                <CommentSection sampleComment={sampleComment}/>
            </div>
        </Collapse>
    </div>
    </>)
}

export default ProjCard;