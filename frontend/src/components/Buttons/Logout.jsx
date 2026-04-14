import { baseurl } from "../../..";

function Logout(){
    async function handleSubmit(e){
        e.preventDefault()

        await fetch(baseurl+"/auth/logout",{
            method:"POST",
            credentials:"include"
        });

        window.location.href = "/"
    }
    return(
        <>
        <div>
            <button onClick={handleSubmit}>
                Log Out
            </button>
        </div>
        </>
    )
}

export default Logout;