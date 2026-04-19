
import checkAuth from "../../../routes/auth/authCheck.js";
import LoginForm from "../Buttons/Login.jsx";
import Logout from "../Buttons/Logout.jsx";
import "./ActivityIcon.css";
import { Link } from "react-router-dom";
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
        <div>{auth?<Logout />: <Link to="/login">Login</Link>}</div>
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