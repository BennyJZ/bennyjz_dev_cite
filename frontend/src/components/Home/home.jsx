import { useEffect } from "react";
import checkAuth from "../../../auth/authCheck";
import { useState } from "react";
import Active from "../ActivityIcon/ActivityIcon";

import ContactBar from "../ContactBar/contactbar";
import HeroPage from "./Hero/heroPage";

import "./home.css"

function Home(){
    const [auth, setAuth] = useState(null)
    useEffect(()=>{
        async function load(){
            const result = await checkAuth()
            console.log(result)
            setAuth(result.authenticated)
        }
        load();
    },[])


    return(
    <>
    <ContactBar />
    <section>
        <div className="HomePage">
            <HeroPage />
            <div className="MainCont">
                <div className="AboutCont">
                    <p className="titleCont">About</p>
                </div>
                <div className="ExpCont">
                    <p className="titleCont">Experience</p>
                </div>
                <div className="ProjCont">
                    <p className="titleCont">Projects</p>
                </div>
                <div className="ProjCont">
                    <p className="titleCont">Projects</p>
                </div>
                <div className="ProjCont">
                    <p className="titleCont">Projects</p>
                </div>
                <div className="ProjCont">
                    <p className="titleCont">Projects</p>
                </div>
            </div>
        </div>
    </section>
    </>
    )
}

export default Home;