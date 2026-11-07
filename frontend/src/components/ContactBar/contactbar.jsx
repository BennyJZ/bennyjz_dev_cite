import "./contactBar.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContactIcon from "./contactIcon/contactIcon";
import ActivityIcon from "../ActivityIcon/ActivityIcon.jsx"


function ContactBar(){
    return(
        <>
            <section className="ContactBarCont">
                <ActivityIcon></ActivityIcon>
                <ContactIcon />
                <div className="rightBar">
                    <KeyboardArrowUpIcon sx={{fontSize:32}} />
                </div>
            </section>
        </>
    )
}

export default ContactBar;