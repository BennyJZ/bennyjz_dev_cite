import { useEffect } from "react";
import checkAuth from "../../../auth/authCheck";
import { useState, useRef } from "react";
import Active from "../ActivityIcon/ActivityIcon";
import AboutTxt from "./aboutTxt";

import ContactBar from "../ContactBar/contactbar";
import HeroPage from "./Hero/heroPage";

import "./home.css"

function Home(){
    const [auth, setAuth] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [activePage, setActivePage] = useState(null);
    const refPage = useRef(null)

    const aboutPage = "ABOUT"
    const experiencePage = "EXPERIENCE"
    const projectPage = "PROJECT"
    useEffect(()=>{

        async function load(){
            const result = await checkAuth()
            console.log(result)
            setAuth(result.authenticated)
        }
        load();

        //PAGE MAP BEHAVIOR: Wait for dom to exist useEffect
        function update(){
            if (!refPage.current) return;
            //ADD NEW DETECTOR FOR EACH SECTION
            const abtPage = document.querySelector(".AboutCont").getBoundingClientRect();
            const expPage = document.querySelector(".ExpCont").getBoundingClientRect();
            const projPage = document.querySelector(".ProjCont").getBoundingClientRect();
            return { abtPage, expPage, projPage };
        }

        function onScroll(){
            const result = update()
            if(!result) return;

            const {abtPage, expPage, projPage} = result;
            // ADD BEHAVIOR HERE
            if (projPage.top < 10) {
                setActivePage(projectPage);
            } else if (expPage.top < 10) {
                setActivePage(experiencePage);
            } else if (abtPage.top < 10) {
                setActivePage(aboutPage);
            } else {
                setActivePage(null);
            }
        }
        function handleResize(){
            setWidth(window.innerWidth)
        }

        window.addEventListener("scroll",onScroll)
        window.addEventListener("resize",handleResize);
        return () => {
            window.removeEventListener("scroll",onScroll)
            window.removeEventListener("resize", handleResize);
        };
        },[])


    return(
    <>
    {(width<800)?<ContactBar />:null}
    <section>
        <div className="HomePage" ref={refPage}>
            {(width<800)?null:<HeroPage mapActive={{ active: activePage }}/>}
            
            <div className="MainCont">
                {(width<800)?<HeroPage size={{width:"100%",position:"static"}}/>:null}
                <div className="AboutCont" id={aboutPage}>
                    <p className="titleCont">{aboutPage}</p>
                    <p><AboutTxt /></p>
                </div>
                <div className="ExpCont" id={experiencePage}>
                    <p className="titleCont">{experiencePage}</p>
                </div>
                <div className="ProjCont" id={projectPage}>
                    <p className="titleCont">{projectPage}</p>
                </div>
            </div>
        </div>
    </section>
    </>
    )
}

export default Home;