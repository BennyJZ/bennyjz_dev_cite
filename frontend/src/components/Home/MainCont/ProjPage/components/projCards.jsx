import { API_BASE_URL } from "@/api/config.js";
import { useEffect, useState } from "react";
import useWindowWidth from "@/hooks/useWindowWidth.js"
import "./projCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Ptags from "./pTags";
import PComplete from "./pComplete.jsx"
import CommentSection from "./commentSection/commentSection";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import checkAuth from "@/api/authCheck";
import Collapse from '@mui/material/Collapse';
import checkRes from "@/api/checkRes.js"



function ProjCard(props){
    const width = useWindowWidth()
    const [auth, setAuth] = useState({})
    const [collapseComments, setCollapseComments] = useState(false)
    const [commentCount, setCommentCount] = useState(0)
    const allowedRoles = ["owner", "admin"]

    const flexRow = {flexDirection:"row"}
    const flexCol = {flexDirection:"column"}

    function handleCollapseComments() {
        setCollapseComments(prev => !prev)
    }

    async function handleDelete(e){
        e.preventDefault()
        try{
            const result = await fetch(API_BASE_URL+"/api/projects/deleteProj/"+encodeURIComponent(props.id),{
                method:"GET",
                credentials:"include"
            })
            const data = await result.json()
        }catch(error){
            console.error(error)
            throw error;
        }
    }

    useEffect(()=>{
        (async ()=>{
            const user = await checkAuth()
            setAuth(user)
        })()

    },[props.id])

    return(<>
    <div>
        <div className="cardWrap" style={collapseComments?{opacity:1}:null}>
            <a href={props.link}>
                <div className="projCard" style={width<800?flexCol:flexRow}>
                    <div className="projImage">
                        <img src={`${API_BASE_URL}/api/projects/projimage/${encodeURIComponent(props.imgSrc)}`} alt="Project Picture" />
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
                                <PComplete is_completed={props.is_completed}></PComplete>
                                <div>
                                    {allowedRoles.includes(auth.user?.role)?<input type="checkbox" defaultChecked={props.is_completed} onChange={e => checkRes(e, props.id)}></input>:null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <div className="ratingIcon">
                <div className="ratingIconCont">
                    <FavoriteIcon onClick={auth.authenticated?props.onLike:null} style={props.color} className="theIcon" />
                    <div className="likeCount">{props.likeCounter}</div>
                </div>
                <div className="ratingIconCont">
                    <CommentIcon className="theIcon" onClick={handleCollapseComments} style={collapseComments?{color:"FFD700"}:null}/>
                    <div className="commentCount">{commentCount}</div>
                </div>
                {allowedRoles.includes(auth.user?.role)?
                    <div>
                        <p>
                            <button onClick={handleDelete}>
                                Delete
                            </button>
                        </p>
                    </div>
                :null}
            </div>
        </div>
        <Collapse in={collapseComments}> 
            <div className="commentWrap">
                <CommentSection
                projId={props.id}
                setCommentCount={setCommentCount}
            />
            </div>
        </Collapse>
    </div>
    </>)
}

export default ProjCard;