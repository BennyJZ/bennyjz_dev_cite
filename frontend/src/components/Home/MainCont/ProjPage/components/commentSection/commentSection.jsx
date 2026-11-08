import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from "react";
import checkAuth from "@/api/authCheck.js";
import "./commentSection.css"
import { getComments, addComment } from "@/api/comments.js"
import TheComments from './comments/comments';


function CommentSection(props) {
    const [commentInput, setCommentInput] = useState({
        content:"",
        link:""
    })

    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([])

    function handleComment(e){
        setCommentInput(prev=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        const newLink = (()=>{
            if(!data.link.includes("https://")) {
                return `https://${data.link}`
            }else {
                return data.link
            }
        })()
        const dataSend = {
            ...data,
            proj_id:props.projId,
            link: newLink
        }
        try {
            setCommentInput({ content: "", link: "" })
            await addComment(dataSend)

            const updatedComments = await getComments(props.projId)
            setComments(updatedComments)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        let ignore = false

        async function loadComments() {
            try {
                const data = await getComments(props.projId)
                if (!ignore) {
                    setComments(data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        loadComments()

        return ()=>{
            ignore = true
        }

    }, [props.projId])

    useEffect(()=>{
        props.setCommentCount(comments.length)
    }, [comments.length, props.setCommentCount])

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
    <div className="commentWrapper">
        {user && (
            <form onSubmit={handleSubmit}>
                <div className="sendComment">
                    <div className="content">
                        <textarea
                            cols={34}
                            rows={3}
                            placeholder="Got a question? Or maybe you wanna say somethin' nice? :)"
                            value={commentInput.content}
                            onChange={handleComment}
                            name="content"
                        />
                        <button className="sendIconBtn" type="submit">
                            <SendIcon />
                        </button>
                    </div>
                    <input
                        className="linkInput"
                        placeholder="URL (Optional)"
                        value={commentInput.link}
                        onChange={handleComment}
                        name="link"
                    />
                </div>
            </form>
        )}
        <div className="theCommentsWrap">
            {
                comments.map((item)=>{
                    return <TheComments key={item.id} id={item.id} username={item.username} link={item.link} content={item.content} createdAt={item.created_at} />
                })
            }
        </div>
    </div>
    </>)
}

export default CommentSection;