function PageMap(props){
    return(<>
    <a href={`#${props.name}`}>
    <div className="pageMapCont">
        <div className={`pageMapItem ${props.active?"activePage":""}`}></div><div className="pageMapName">{props.name}</div>
    </div>
    </a>
    </>)
}

export default PageMap;