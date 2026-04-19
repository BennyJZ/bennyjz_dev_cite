import "./xpPage.css"
import XpCard from "./components/xpCard";
import { useEffect, useState } from "react";

function XpPage(props){

    const [xpData, setXpData] = useState([])
    const [xpActive, setXpActive] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)

    async function getXp(){
        const res = await fetch(import.meta.env.VITE_BASEURL + "/api/getxp",{
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
            const xp = await getXp()
            setXpData(xp)
        })()

        window.addEventListener("resize", handleResize)

        return()=>{
            window.removeEventListener("resize",handleResize)
        }
    },[])


    //id, date, work_title, description, tag(list), link

    return(<>
    <div className="xpWrap">
        <div className={`xpCont ${width<800?null:"xpActCont"}`}>
            {xpData.map(item=>{
                return <XpCard key={item.id} date={item.date} workTitle={item.work_title} desc={item.description} tag={item.tag} link={item.link}/>
            })}
        </div>
    </div>
    </>)
}

export default XpPage;