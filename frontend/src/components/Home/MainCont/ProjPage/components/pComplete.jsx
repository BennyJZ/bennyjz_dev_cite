function PComplete(props){
    return(<>
        <div className={"projTagWrap " + (props.is_completed?"complete":"inProgress")}>
            {props.is_completed?<p>COMPLETE</p>:<p>In Progress</p>}
        </div>
    </>)
}

export default PComplete;