const baseurl = "http://localhost:3000"

async function checkAuth(){
    const res = await fetch(baseurl+"/authCheck",{
        method:"GET",
        credentials:"include"
    })
    if (!res.ok){
        return {authenticated:false}
    }
    const data = await res.json()
    return data
}
const authenticate = checkAuth()

export default checkAuth;