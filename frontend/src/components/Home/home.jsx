import { useEffect } from "react";
import checkAuth from "../../../auth/authCheck";
import { useState, useRef } from "react";
import Active from "../ActivityIcon/ActivityIcon";
import AboutTxt from "./aboutTxt";
import PageMap from "./PageMap/pageMap";

import ContactBar from "../ContactBar/contactbar";
import HeroPage from "./Hero/heroPage";

import "./home.css"

function Home(){
    const [auth, setAuth] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)
    const refPage = useRef(null)

    function handleResize(){
        setWidth(window.innerWidth)
    }

    useEffect(()=>{
        async function load(){
            const result = await checkAuth()
            console.log(result)
            setAuth(result.authenticated)
        }
        load();

        function update(){
            if (!refPage.current) return;
            const abtPage = document.querySelector(".AboutCont").getBoundingClientRect();
            return abtPage;
        }

        function onScroll(){
            const abtPage = update()
            if(abtPage.top<0){
                document.querySelector(".theStack").style.transform = "translateX(-100%)"
            } else if (abtPage.top > 0){
                document.querySelector(".theStack").style.transform = "translateX(0)"
            }
        }
        console.log(document.querySelector(".MainCont").children.length)

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
        <div className="HomePage">
            <div className="sideWrapper">
            {(width<800)?null:<HeroPage />}
                <PageMap />
            </div>
            <div className="MainCont">
                {(width<800)?<HeroPage size={{width:"100%",position:"static",padding:"0"}}/>:null}

                <div className="AboutCont" ref={refPage}>
                    <p className="titleCont">About</p>
                    <p><AboutTxt /></p>
                </div>
                <div className="ExpCont">
                    <p className="titleCont">Experience</p>
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