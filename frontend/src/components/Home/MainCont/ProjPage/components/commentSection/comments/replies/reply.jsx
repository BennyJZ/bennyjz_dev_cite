import turnRight from "@/assets/turnRight.svg";
import crown from "@/assets/crown.svg";

export default function Reply(props){


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
            </div>
        </div>
    </>)
}