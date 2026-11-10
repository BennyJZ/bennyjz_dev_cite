import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

import "./contactBar.css"

function ContactIcon(){
    return(
        <>
            <div className="contactBar">
                <a href="https://www.linkedin.com/in/benny98jz" target="_blank">
                    <div className="contIcon"><LinkedInIcon sx={{fontSize:25}} /></div>
                </a>
                <a href="https://github.com/BennyJZ" target="_blank">
                    <div className="contIcon"><GitHubIcon sx={{fontSize:22}} /></div>
                </a>
                <a href="mailto:benny.jan@hotmail.com" target="_blank">
                    <div className="contIcon"><EmailIcon sx={{fontSize:25}}/></div>
                </a>
            </div>
        </>
    )
}

export default ContactIcon;