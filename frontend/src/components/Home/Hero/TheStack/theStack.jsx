import MyStack from "../../MyStack/myStack";

import NodeJs from "../../../../assets/NodeJs.svg"
import psql from "../../../../assets/psql.svg"
import react from "../../../../assets/react.svg"
import rpi from "../../../../assets/rpi.svg"
import vite from "../../../../assets/vitejs.svg"
import exp from "../../../../assets/expressjs.svg"

import "./theStack.css"

function TheStack(){
    return(
        <>
        <div className="theStack">
            <MyStack stack={psql} name={"PostgreSQL"}/>
            <MyStack stack={NodeJs} name={"Node.js"}/>
            <div className="stackCont">
                <img src={exp} className="expjs" />
                <span>Express.js</span>
            </div>
            <MyStack stack={rpi} name={"RaspberryPi"}/>
            <MyStack stack={react} name={"React"}/>
            <MyStack stack={vite} name={"Vite.js"} className="vite"/>
        </div>
        </>
    )
}

export default TheStack;