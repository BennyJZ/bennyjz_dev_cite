import {useState} from "react";

function AddProj(){
    const [filename, setFileName] = useState("No file selected")

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

        console.log(data)

        const res = await fetch(import.meta.env.VITE_BASEURL + "/api/projects/createproj",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json",},
            body:JSON.stringify(data)
        })
        // window.location.href = "/"
    }
    function handleChange(e) {
        const file = e.target.files[0]
        setFileName(file ? file.name : "No file selected")
    }


    return(<>
    <form onSubmit={handleSubmit}>
        <div>Title</div>
        <input name="proj_title" />
        <label className="imageInput">
            <div>upload image</div>
            <input type="file" name="image" accept="image/*" style={{display:"none"}} onChange={handleChange}/>
            <div>{filename}</div>
        </label>
        <div>description</div>
        <textarea name="description" rows="5" columns="60"/>
        <div>tag</div>
        <input name="tag"/>
        <div>link</div>
        <input name="link"/>
        <button>MEBUTTON</button>
    </form>
    </>)
}

export default AddProj;