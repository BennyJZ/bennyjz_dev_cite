import { API_BASE_URL } from "@/api/config.js";
import "./xpPage.css"
import XpCard from "./components/xpCard";
import { useEffect, useState } from "react";
import useWindowWidth from "@/hooks/useWindowWidth.js"

function XpPage(){

    const [xpData, setXpData] = useState([])
    const width = useWindowWidth()

    async function getXp(){
        const res = await fetch(API_BASE_URL + "/api/experience/getxp",{
        method:"GET",
        credentials:"include",
        })
        const data = await res.json()
        return data;
    }
    
    useEffect(()=>{
        (async ()=>{
            const xp = await getXp()
            setXpData(xp)
        })()

    },[])


    //id, date, work_title, description, tag(list), link

    return(<>
    <div className="xpWrap">
        <div className={`xpCont ${width<800?null:"xpActCont"}`}>
            {xpData.map(item=>{
                return <XpCard key={item.id} id={item.id} date={item.date} workTitle={item.work_title} desc={item.description} tag={item.tag} link={item.link}/>
            })}
        </div>
    </div>
    </>)
}

export default XpPage;