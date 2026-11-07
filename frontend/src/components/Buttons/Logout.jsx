import { API_BASE_URL } from "@/api/config.js";
import useWindowWidth from "@/hooks/useWindowWidth.js";
import logoutIcon from "@/assets/logout.svg";

function Logout(){
    const width = useWindowWidth()
    async function handleSubmit(e){
        e.preventDefault()

        await fetch(API_BASE_URL + "/auth/logout",{
            method:"POST",
            credentials:"include"
        });

        window.location.href = "/"
    }
    return(
        <>
        <div>
            <button type="button" onClick={handleSubmit} aria-label="Log out">
                {width < 800 ? (
                    <img src={logoutIcon} alt="" width={24} height={24} />
                ) : (
                    "Log Out"
                )}
            </button>
        </div>
        </>
    )
}

export default Logout;
