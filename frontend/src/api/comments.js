import { API_BASE_URL } from "./config.js"

export async function getComments(proj_id) {
        const res = await fetch( API_BASE_URL + "/api/comment/getcomments/" + encodeURIComponent(proj_id), {
            method: "GET",
            credentials: "include",
        }
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        return data
    }

    export async function addComment({content, link, proj_id}){

        const response = await fetch(API_BASE_URL + "/api/comment/addcomment", {
            method: "POST",
            credentials:"include",
            headers:{"Content-Type":"application/json",},
            body: JSON.stringify({content, link, proj_id})
        })

        if (!response.ok) {
            throw new Error("Could not save comment")
        }

        return response.json()
    }