import { HOME_SECTIONS } from "./sections.js";
import useWindowWidth from "@/hooks/useWindowWidth.js"

import { useEffect, useState, useRef } from "react";
import Active from "../ActivityIcon/ActivityIcon";
import AboutPage from "./MainCont/AboutPage/aboutPage";
import XpPage from "./MainCont/XpPage/xpPage";
import ProjPage from "./MainCont/ProjPage/projPage";

import ContactBar from "../ContactBar/contactbar";
import HeroPage from "./Hero/heroPage";

import "./home.css"

const [aboutPage, experiencePage, projectPage] = HOME_SECTIONS;

function Home(){
    const width = useWindowWidth()
    const [activePage, setActivePage] = useState(null);
    const refPage = useRef(null)

    //ADD FOR EVERY NEW SECTION IN .MainCont

    useEffect(()=>{

        //PAGE MAP BEHAVIOR: Wait for dom to exist useEffect
        function update(){
            if (!refPage.current) return;
            //ADD NEW DETECTOR FOR EACH SECTION .MainCont
            const abtPage = document.querySelector(".AboutCont").getBoundingClientRect();
            const expPage = document.querySelector(".ExpCont").getBoundingClientRect();
            const projPage = document.querySelector(".ProjCont").getBoundingClientRect();
            return { abtPage, expPage, projPage };
        }

        function onScroll(){
            const result = update()
            if(!result) return;

            const {abtPage, expPage, projPage} = result;
            // ADD BEHAVIOR HERE + UPDATE WITH .MainCont
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

            window.addEventListener("scroll",onScroll)
            return () => {
                window.removeEventListener("scroll",onScroll)
            };
        },[])


    return(
    <>
    {(width<800)?null:<Active />}
    {(width<800)?<ContactBar />:null}
        
    <section>
        <div className="HomePage" ref={refPage}>
            {(width<800)?null:<HeroPage mapActive={{ active: activePage }}/>}
            
            <div className="MainCont">
                {(width<800)?<HeroPage size={{width:"100%",position:"static"}}/>:null}
                <div className="AboutCont" id={aboutPage}>
                    <p className="titleCont"><span>{aboutPage}</span></p>
                    <AboutPage />
                </div>
                <div className="ExpCont" id={experiencePage}>
                    <p className="titleCont"><span>{experiencePage}</span></p>
                    <XpPage/>
                </div>
                <div className="ProjCont" id={projectPage}>
                    <p className="titleCont"><span>{projectPage}</span></p>
                    <ProjPage />
                </div>

            </div>
        </div>
    </section>
    </>
    )
}

export default Home;