import {Link} from "react-router-dom"


function Owner(){
    return(
        <>
        <div className="special">
            <Link to="/">Home</Link>
            <h1>Oh You a special one</h1>
        </div>
        </>
    )
}

export default Owner;