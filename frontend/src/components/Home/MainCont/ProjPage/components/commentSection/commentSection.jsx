import SendIcon from '@mui/icons-material/Send';
import {useState, useEffect} from "react"
import "./commentSection.css"

import TheComments from './comments/comments';

function CommentSection(props) {

    const [commentInput, setCommentInput] = useState({
        content:"",
        link:""
    })

    const [newComment, setNewComment] = useState([])

    function handleSubmit(e) {
        e.preventDefault()

        const data = fetch(import.meta.env.VITE_BASEURL + "/api/projects/like",{
            
        })

    }

    function handleComment(e){
        setCommentInput(prev=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    useEffect(()=>{
        setNewComment([...props.sampleComment])
    },[])

    //LEFT OFF: ADD comment useState to tempCommentsList, then Iterate through it with.map and create new <TheComments/> components
    //PLAN:
    // 1. Send data to API's, to create comment in DB, and create same obj in temporary comments array.
    // 2. Receive appropriate data endpoints, (username, comment, link). Create obj to insert into temporary comments array.
    // 3. Map out the temporary list.

    return(<>
    <div className="commentWrapper">
        <form onSubmit={handleSubmit}>
            <div className="sendComment">
                <div className="content">
                    <textarea cols={34} rows={3} placeholder="Got a question? Or maybe you wanna say somethin' nice? :)" value={commentInput.content} onChange={handleComment} name="content" /> <button className="sendIconBtn"><SendIcon /></button>
                </div>
                <input className="linkInput" placeholder="URL (Optional)" value={commentInput.link} onChange={handleComment} name="link"/>
            </div>
        </form>
        <div className="theCommentsWrap">
            {
                newComment.map(item=>{
                    return <TheComments username={item.username} link={item.link} content={item.content} createdAt={item.createdAt} />
                })
            }
        </div>
    </div>
    </>)
}

export default CommentSection;