
async function checkAuth(){
    console.log(import.meta.env.VITE_BASEURL)
    const res = await fetch(import.meta.env.VITE_BASEURL + "/authCheck",{
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