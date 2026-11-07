
import checkAuth from "@/api/authCheck.js";
import AuthButton from "../Buttons/AuthButton.jsx"
import ActivityStatus from "./ActivityStatus.jsx"
import "./ActivityIcon.css";
import { useState, useEffect } from "react";


function Active(){
    const [auth, setAuth] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(()=>{
        async function load(){
            const result = await checkAuth()
            setAuth(result.authenticated)
            setUser(result.user?result.user.username:null)
        }
        load();
    },[])

    return(
        <>
        <div className="ActivityIconCont">
            <AuthButton auth={auth} />
            <ActivityStatus auth={auth} user={user} />
        </div>
        </>
    )
}

export default Active;