function TheComments(props) {
    return (<>
    <div>
        <div>
            {props.link?<div>{props.username}</div>:<a href={props.link} style={{textDecoration:"underline"}}>props.username</a>}
        </div>
        <div>
            <p>
                {props.content}
            </p>
        </div>
        <div>
            {props.createdAt}
        </div>
    </div>
    </>)
}

export default TheComments;