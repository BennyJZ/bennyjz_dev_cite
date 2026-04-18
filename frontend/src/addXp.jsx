import { useNavigate } from "react";

function AddXp(){
    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const formdata = Object.fromEntries(formData)

        const newLink = (()=>{
            if(!formdata.link.includes("https://")) {
                return `https://${formdata.link}`
            }else {
                return formdata.link
            }})()

        const data = {...formdata,
            tag:formdata.tag.split(","),
            link:newLink}
        const res = await fetch("http://localhost:3000/api/addxp",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json",},
            body:JSON.stringify(data)
        })
        window.location.href = "/"
    }

    return(<>
    <form onSubmit={handleSubmit}>
        <div>date</div>
        <input name="date"/>
        <div>Work Title</div>
        <input name="work_title"/>
        <div>desc</div>
        <textarea name="description" rows="5" cols="60"/>
        <div>tag (separate by commas)</div>
        <input name="tag"/>
        link
        <input name="link"/>
        <button type="submit">YABA DABA DOOO</button>
    </form>

    </>)
}

export default AddXp;