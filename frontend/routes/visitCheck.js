

fetch('http://localhost:3000/', {
    credentials: 'include'
})
.then(res => res.json())