import "./projPage.css"
import ProjCard from "./components/projCards";
import {useState, useEffect} from "react"
import checkAuth from "@/routes/auth/authCheck";

function ProjPage(){
    const [projActive, setProjActive] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [projData, setProjData] = useState([])
    const [likeData, setLikeData] = useState([])

    async function checkLike(){
        const res = await fetch(import.meta.env.VITE_BASEURL + "/api/projects/getuserlikes", {
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        return data
    }

    async function getProj(){
        const res = await fetch(import.meta.env.VITE_BASEURL+"/api/projects/getproj",{
            method:"GET",
            credentials:"include",
        })
        const data = await res.json()
        return data;
    }

    async function sendLike(projId){
        
        await fetch(import.meta.env.VITE_BASEURL + "/api/projects/like",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({proj_id:projId})
        })
        
        const res = await checkLike()
        setLikeData(res)
        console.log(`updatedList: ${likeData}`)
    }

    useEffect(()=>{

        function handleResize(){
            setWidth(window.innerWidth)
        }

        (async ()=>{
            const proj = await getProj()
            setProjData(proj)

            const auth = await checkAuth()
            if (auth.authenticated){
                const like = await checkLike()
                setLikeData(like)
            }
        })()

        window.addEventListener("resize", handleResize)
        return ()=>{
            window.removeEventListener("resize",handleResize)
        }
    },[])

    return(<>
    <div className="projWrap">
        <div className={`projCont ${width<800?null:"projActCont"}`}>
            {projData.map(item=>{
                const isLiked = likeData.some(i=>i.proj_id === item.id)
                return <ProjCard key={item.id} id={item.id} imgSrc={item.image_url} link={item.link} title={item.proj_title} desc={item.description} tag={item.tag} color={isLiked?{color:"red"}:null} onLike={()=>sendLike(item.id)}/>
            })}
        </div>
    </div>
    </>)
}

export default ProjPage;