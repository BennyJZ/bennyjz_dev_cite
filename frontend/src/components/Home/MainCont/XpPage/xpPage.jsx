import "./xpPage.css"
import XpCard from "./components/xpCard";
import { useEffect } from "react";

function XpPage(props){



    return(<>
    <div className="xpWrap">
        <div className="xpCont">
            <XpCard date={"2020 - 2021"} workTitle={"Sales Associate"} desc={"Description of the job and accolades"} tag={"tagPlace"} link={"https://google.com"}/>
        </div>
    </div>
    </>)
}

export default XpPage;