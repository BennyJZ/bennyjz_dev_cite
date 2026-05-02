const BASE = import.meta.env.VITE_BASEURL

export async function getProj() {
    const res = await fetch(`${BASE}/api/projects/getproj`, {
        method: "GET",
        credentials: "include"
    })
    return res.json()
}

export async function getLikes() {
    const res = await fetch(`${BASE}/api/projects/getlikes`, {
        method: "GET",
        credentials: "include"
    })
    return res.json()
}

export async function getUserLikes() {
    const res = await fetch(`${BASE}/api/projects/getuserlikes`, {
        method: "GET",
        credentials: "include"
    })
    return res.json()
}

export async function sendLike(projId) {
    const res = await fetch(`${BASE}/api/projects/like`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proj_id: projId })
    })
    return res.json()
}