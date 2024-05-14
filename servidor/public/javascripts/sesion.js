fetch("/users/1", {
    method: 'GET'
})
.then((response) => {
    return response.json()
})
.then((data) => {
    localStorage.setItem('usuario', JSON.stringify(data[0]))
})
.catch(error => {
    console.error('Error de red:', error);
});