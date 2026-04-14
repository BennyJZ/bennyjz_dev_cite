
import {Link, useNavigate} from "react-router-dom"
import Active from "../ActivityIcon/ActivityIcon";

function TestForm(){
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        //Collect data in form: [["name","benny"],["email","a@b.com"]]
        //Parse to json object format > then JSON.stringify
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        navigate("/");
    }

    return(
        <>
        <Active />
        <Link to="/">Home</Link>
        <form onSubmit={handleSubmit} method="POST">
            <h1>Hello Sir</h1>
            <p>Username</p>
            <input name="username"></input>
            <p>Email</p>
            <input name="email"></input>
            <p>phone</p>
            <input name="phone"></input>
            <p>password</p>
            <input name="password"></input>
            <p>role</p>
            <input name="role"></input>
            <button type="submit">SUBMIT</button>
        </form>
        </>
    )
}

export default TestForm;