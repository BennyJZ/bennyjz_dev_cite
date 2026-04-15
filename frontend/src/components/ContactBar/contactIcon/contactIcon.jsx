import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

import "./contactBar.css"

function ContactIcon(){
    return(
        <>
            <div className="contactBar">
                <div className="contIcon"><LinkedInIcon sx={{fontSize:25}} /></div>
                <div className="contIcon"><GitHubIcon sx={{fontSize:22}} /></div>
                <div className="contIcon"><EmailIcon sx={{fontSize:25}}/></div>
            </div>
        </>
    )
}

export default ContactIcon;