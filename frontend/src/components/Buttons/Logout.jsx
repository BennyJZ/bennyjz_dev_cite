
function Logout(){
    async function handleSubmit(e){
        e.preventDefault()

        await fetch(import.meta.env.VITE_BASEURL + "/auth/logout",{
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