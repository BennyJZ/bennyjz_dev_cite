import { API_BASE_URL } from "./config.js"

export default async function getUsername(id) {
        const res = await fetch( API_BASE_URL + "/auth/getUsername/" + encodeURIComponent(id), {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        return data
    }