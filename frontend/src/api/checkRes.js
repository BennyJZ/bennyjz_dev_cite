import { API_BASE_URL } from "@/api/config.js";

export default async function checkHandler(e, projId){
    const res = await fetch(API_BASE_URL + "/api/projects/updateProj",{
        method: "POST",
        credentials: "include",
        headers:{"Content-Type":"application/json",},
        body:JSON.stringify({value:e.target.checked,
            proj_id:projId
        })
    })
}
