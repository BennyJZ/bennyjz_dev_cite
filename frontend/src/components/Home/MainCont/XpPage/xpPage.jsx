import "./xpPage.css"
import XpCard from "./components/xpCard";
import { useEffect, useState } from "react";

function XpPage(props){

    const [xpData, setXpData] = useState([])

    async function getXp(){
        const res = await fetch("http://localhost:3000/api/getxp",{
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
    console.log(xpData)

    return(<>
    <div className="xpWrap">
        <div className="xpCont">
            {xpData.map(item=>{
                console.log(item)
                return <XpCard key={item.id} date={item.date} workTitle={item.work_title} desc={item.description} tag={item.tag} link={item.link}/>
            })}
        </div>
    </div>
    </>)
}

export default XpPage;