import "./comments.css"
import { API_BASE_URL } from "@/api/config.js"
import checkAuth from "@/api/authCheck.js";
import fetchUser from "@/api/fetchUsername.js";
import { useState, useEffect } from "react";
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import Reply from "./replies/reply.jsx"

function TheComments(props) {
    const [user, setUser] = useState(null)
    const [openReply, setOpenReply] = useState(false)
    const [replyText, setReplyText] = useState()
    const [allReplies, setAllReplies] = useState([])
    const [username, setUsername] = useState(null)

    useEffect(()=>{
        (async()=>{
            try {
                const result = await checkAuth()
                setUser(result.user ?? null)
            } catch (error) {
                console.error(error)
            }
        })()
    },[])

    async function handleDelete(e){
        e.preventDefault()

        await fetch(API_BASE_URL + "/api/comment/deletecomment",{
            method:"POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ comment_id: props.id })
        });


        if (!response.ok) {
            throw new Error(`Delete failed: ${response.status}`)
        }

    }

    async function submitReply(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        const finalData = {
            id:props.id,
            user_id: user.id,
            ...data
        }

        await fetch(API_BASE_URL + "/api/comment/replyComment",{
            method:"POST",
            credentials:"include",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(finalData)
        })
    }

    async function getReplies(){
        const res = await fetch(API_BASE_URL + "/api/comment/getReply/" + encodeURIComponent(props.id),{
            method:"GET",
            credentials: "include"
        })
        const data = await res.json();
        return data
    }

    useEffect(()=>{
        try{
            (async ()=>{
                const res = await getReplies()
                const result = await fetchUser(res[0].user_id)
                setAllReplies(res)
                setUsername(result)
            })()
        }catch(error){
            console.error(error)
        }

    },[props.id])


    function handleReply(){
        setOpenReply(prev=>!prev)
    }

    function handleReplyText(e){
        setReplyText(e.target.value)
        console.log(replyText)
    }


    function formatCommentDate(createdAt) {
        const created = new Date(createdAt);
        const now = new Date();

        if (Number.isNaN(created.getTime())) {
            return "Invalid date";
        }

        const diffMs = now - created;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        // Less than 1 day
        if (diffDays < 1) {
            return "Today";
        }

        // Between 1 and 6 days
        if (diffDays < 7) {
            return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
        }

        // Check whether a full year has passed
        const oneYearLater = new Date(created);
        oneYearLater.setFullYear(created.getFullYear() + 1);

        // 1 year or older: DD/MM/YYYY
        if (now >= oneYearLater) {
            return created.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        }

        // 7 days to 1 year: DD/MM
        return created.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit"
        });
    }


    return (<>
    <div className="commentWrapper">
            <div>
                {props.link ? (
                    <a href={props.link} style={{ textDecoration: "underline" }}>
                        {props.username}
                    </a>
                ) : (
                    <p>{props.username}</p>
                )}
            </div>
        <div>
            <div>
                {props.content}
            </div>
        </div>
        <div>
        <p className="small">
            {formatCommentDate(props.createdAt)}
        </p>
        <div className="commentActionCont">
            {user && (user.username === props.username || user.role === "owner") && (
                <p className="small">
                    <button onClick={handleDelete} >Delete</button>
                </p>
            )}
            {user?.role === "owner" && (
                <p className="small">
                    <button onClick={handleReply} >Reply</button>
                </p>
            )}
        </div>
        <div className="replyWrap">
            <Collapse in={openReply}>
                <form className="replyForm" onSubmit={submitReply}>
                    <textarea
                        cols={30}
                        rows={3}
                        onChange={handleReplyText}
                        name="content"
                    />
                    <button className="sendIconBtn" type="submit">
                        <SendIcon />
                    </button>
                </form>
            </Collapse>
            <div>
                {
                    allReplies.map((item)=>{
                        return <Reply username={username} theReply={item} formatDate={formatCommentDate}></Reply>
                    })
                }
            </div>
        </div>
        </div>
    </div>
    </>)
}

export default TheComments;