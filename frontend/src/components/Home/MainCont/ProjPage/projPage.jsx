import "./projPage.css"
import ProjCard from "./components/projCards";
import {useState, useEffect} from "react"

import wuSprite from "../../../../assets/chinaT.png"

function ProjPage(){
    const [projActive, setProjActive] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [projData, setProjData] = useState([])


    async function getProj(){
        const res = await fetch(import.meta.env.VITE_BASEURL+"/api/projects/getproj",{
            method:"GET",
            credentials:"include",
        })
        const data = await res.json()
        return data;
    }

    useEffect(()=>{
        function handleResize(){
            setWidth(window.innerWidth)
        }

        (async ()=>{
            const proj = await getProj()
            setProjData(proj)
        })()

        window.addEventListener("resize", handleResize)
        return ()=>{
            removeEventListener("resize",handleResize)
        }
    },[])

    return(<>
    <div className="projWrap">
        <div className={`projCont ${width<800?null:"projActCont"}`}>
            {projData.map(item=>{
                return <ProjCard key={item.id} id={item.id} imgSrc={item.image_url} link={item.link} title={item.proj_title} desc={item.description} tag={item.tag}/>
            })}
        </div>
    </div>
    </>)
}

export default ProjPage;