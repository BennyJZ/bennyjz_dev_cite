import checkAuth from "../../../auth/authCheck";
import "./ActivityIcon.css"

import { useState, useEffect } from "react";

function Active(){
    const [auth, setAuth] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(()=>{
        async function load(){
            const result = await checkAuth()
            console.log(result)
            setAuth(result.authenticated)
            setUser(result.user.username)
        }
        load();
    },[])

    return(
        <>
        <div className="ActivityCont">
            {auth? <div className="WelCont"><p>{user}</p></div>:null}
            <div className="Activity">
                {auth? <div className="greenDot" />: null }
            </div>
        </div>
        </>
    )
}

export default Active;