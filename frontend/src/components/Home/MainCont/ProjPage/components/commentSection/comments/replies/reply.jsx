import turnRight from "@/assets/turnRight.svg";
import crown from "@/assets/crown.svg";
import checkAuth from "@/api/authCheck.js";
import { useState, useEffect } from "react"
import { API_BASE_URL } from "@/api/config.js"

export default function Reply(props){
    const [user, setUser] = useState(null);

    async function handleDelete(e){
        e.preventDefault()
        const response = await fetch(API_BASE_URL + "/api/comment/deleteReply/" + encodeURIComponent(props.theReply.id),{
            method:"POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" }
        });


        if (!response.ok) {
            throw new Error(`Delete failed: ${response.status}`)
        }

    }

    useEffect(() => {
        async function load() {
            try {
                const result = await checkAuth();
                setUser(result.authenticated ? result.user : null);
            } catch (error) {
                console.error(error);
                setUser(null);
            }
        }

        load();
    }, []);

    return(<>
        <div className="replyCommentWraps">
            <div style={{ transform: "rotate(90deg)" }}>
                <img src={turnRight} alt="" width={24} height={24} />
            </div>
            <div className="singleReplyWrap">
                <div className="nameWrap">
                    <div className="username">{props.username}</div>
                    <img src={crown} alt="" width={24} height={24} />
                </div>
                <div className="reply">{props.theReply.content}</div>
                <p className="small">
                    {props.formatDate(props.theReply.created_at)}
                </p>
            {user?.role === "owner" && (
                <p className="small">
                    <button onClick={handleDelete} >Delete</button>
                </p>
            )}
            </div>
        </div>
    </>)
}