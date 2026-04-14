import "./myStack.css"

function MyStack(props){
    return(
        <>
            <div className="stackCont">
                <img src={props.stack} />
                <span>{props.name}</span>
            </div>
        </>
    )
}

export default MyStack;