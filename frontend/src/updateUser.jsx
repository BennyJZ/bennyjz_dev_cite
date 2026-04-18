import { useNavigate } from "react-router-dom";
import Active from "./components/ActivityIcon/ActivityIcon";
import { useState } from "react";
import checkAuth from "../routes/auth/authCheck";
import { useEffect } from "react";

function UpdateUser(){
    const navigate = useNavigate()
    const [input, setInput] = useState({
        newPswd:"",
        confPswd:"",
    })
    const [pswdCheck, setPswdCheck] = useState(true)
    const [auth, setAuth] = useState(null)

    useEffect(()=>{
        async function load(){
            const result = await checkAuth()
            setAuth(result.authenticated)
        }
        load()
    })

    function onChange(e){
        const {name, value} = e.target
        setInput((prev)=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        console.log(data.confPswd)
        if (data.newPswd === data.confPswd){
            await fetch("http://localhost:3000/api/updateuser",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
        })
        if(res.status === 401){
            {status:false}
        }else{
            navigate("/")
            return {status:true}
        }
        }else{
            return {status:false}
        }
    }

return(<>
<Active />
{auth?
<form onSubmit={async (e)=>{
    const result = await handleSubmit(e)
    setPswdCheck(result.status)
    }}>
    <div>{pswdCheck?null:<div style={{color:"red"}}>Passwords not Matching</div>}</div>
    <div>New Password</div>
    <input name="newPswd" onChange={onChange} value={input.newPswd}/>
    <div>Confirm Password</div>
    <input name="confPswd" onChange={onChange} value={input.confPswd} />
    <button type="submit">CLICK2UPDATE</button>
</form>:
<div>You Need to Login to Update Password</div>
}
</>)
}

export default UpdateUser;