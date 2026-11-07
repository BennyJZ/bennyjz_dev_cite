import { API_BASE_URL } from "@/api/config.js";

async function checkAuth(){
    const res = await fetch(API_BASE_URL + "/authCheck",{
        method:"GET",
        credentials:"include"
    })
    if (!res.ok){
        return {authenticated:false}
    }
    const data = await res.json()
    return data
}

export default checkAuth;