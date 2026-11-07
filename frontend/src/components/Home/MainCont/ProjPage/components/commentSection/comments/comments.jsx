import "./comments.css"
import { API_BASE_URL } from "@/api/config.js"
import checkAuth from "@/api/authCheck.js";
import { useState, useEffect } from "react"

function TheComments(props) {
    const [user, setUser] = useState(null)

    async function handleSubmit(e){
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

    useEffect(()=>{
        async function load(){
            try {
                const result = await checkAuth()
                setUser(result.user ?? null)
                console.log(result)
            } catch (error) {
                console.error(error)
            }
        }
        load();
    },[])


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
        <p className="small">
            {formatCommentDate(props.createdAt)}
        </p>
        {user && (user.username === props.username || user.role === "admin") && (
            <p className="small">
                <button onClick={handleSubmit} className="delte" >Delete</button>
            </p>
        )}
    </div>
    </>)
}

export default TheComments;