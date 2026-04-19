
import {Link} from "react-router-dom"

function LoginForm(){

    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        await fetch(import.meta.env.VITE_BASEURL + "/auth/login",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })

        window.location.href = "/"
    }


    return(
        <>
        <Link to="/">Home</Link>
        <form onSubmit={handleSubmit}>
            <p>Username</p>
            <input name="username"></input>
            <p>Password</p>
            <input name="password" type="password"></input>
            <button type="submit">LOGIN</button>
        </form>
        </>
    )
}

export default LoginForm;