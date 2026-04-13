import { useEffect } from "react";
import checkAuth from "../../auth/authCheck";
import {Link} from "react-router-dom"
import { useState } from "react";
import Logout from "./Logout";

function Home(){
    const [auth, setAuth] = useState(null)
    useEffect(()=>{
        async function load(){
            const result = await checkAuth()
            console.log(result)
            setAuth(result.authenticated)
        }
        load();
    },[])


    return(
        <>
        <h1>HELLO {auth?"authorized":"Who are u?"}</h1>
        {auth?<Logout />:<Link to="/login">Login</Link>}
        <hr />
        {auth?<Link to="/owner">VIP</Link>:<Link to="/register">Register</Link>}
        </>
    )
}

export default Home;