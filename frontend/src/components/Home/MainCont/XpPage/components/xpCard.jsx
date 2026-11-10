import { API_BASE_URL } from "@/api/config.js";
import useWindowWidth from "@/hooks/useWindowWidth.js"
import XpTags from "./tags";
import "./xpCard.css"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import checkAuth from "@/api/authCheck.js"
import {useEffect, useState} from "react";

function XpCard(props){
    const width = useWindowWidth()
    const [user, setUser] = useState(null)
    const flexRow = {flexDirection:"row"}
    const flexCol = {flexDirection:"column"}

    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            id:props.id,
            columnName:"date",
            ...Object.fromEntries(formData)
        }

        const res = await fetch(API_BASE_URL + "/api/experience/changeDate",{
            method:"POST",
            credentials:"include",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
    }

    useEffect(()=>{
        (async ()=>{
            const value = await checkAuth();
            setUser(value.user)
        })()
    },[checkAuth])

    return(<>
        <div className="xpCard" style={width<800?flexCol:flexRow}>
            <div className="xpDate">
                <p>{props.date}</p>
                {["admin","owner"].includes(user?.role)?
                <form onSubmit={handleSubmit} className="xpDateForm">
                    <input name="value" className="xpDateInput"></input>
                    <button>Change Date</button>
                </form>:null
                }
            </div>
            <a href={props.link}>
                <div className="xpCardCont">
                    <div className="xpDesc">
                        <p><span className="xpTitle">{props.workTitle} <span className="icon xpTitle"><ArrowOutwardIcon sx={{fontSize:16}} /></span></span></p>
                        <p className="xpP">{props.desc}</p>
                    </div>
                    <div className="tagCont">
                        {props.tag[0].length<=0?null:props.tag.map(item=>{
                            return <XpTags key={item} tagname={item}/> 
                        })}
                    </div>
                </div>
            </a>
        </div>
    </>)
}

export default XpCard;