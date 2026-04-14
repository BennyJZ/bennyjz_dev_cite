import "./contactBar.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContactIcon from "./contactIcon/contactIcon";

function ContactBar(){
    return(
        <>
            <section className="ContactBarCont">
                <ContactIcon />
                <div className="rightBar">
                    <KeyboardArrowUpIcon sx={{fontSize:32}} />
                </div>
            </section>
        </>
    )
}

export default ContactBar;