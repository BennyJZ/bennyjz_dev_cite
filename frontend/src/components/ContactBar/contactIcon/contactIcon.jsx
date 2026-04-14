import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

import "./contactBar.css"

function ContactIcon(){
    return(
        <>
            <div className="contactBar">
                <LinkedInIcon sx={{fontSize:25}} />
                <GitHubIcon sx={{fontSize:22}} />
                <EmailIcon sx={{fontSize:25}}/>
            </div>
        </>
    )
}

export default ContactIcon;