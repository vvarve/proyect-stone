import axios from "axios"



// login and register with User
export const signIn = (username, password) => axios.post("http://127.0.0.1:8000/in/t/",{username, password})

export const signOuten = (key) => axios.post("http://127.0.0.1:8000/in/t/refresh/", {refresh: key}) 



// get all data
export const getAgent = (key) => axios.get("http://127.0.0.1:8000/in/agents", {headers: {Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }})

export const getModule = (key) => axios.get("http://127.0.0.1:8000/in/modules", {headers: {Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }})

export const getUser = (key) => axios.get("http://127.0.0.1:8000/in/ua", {headers: {Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }})


// get info specific for editing
// export const getOneUser = (id) => axios.get()

// export const getOneAgent = (id) => {}

// export const getOneUser = (id) => {}


// Del specific 
export const delModule = (id) => axios.delete(`http://127.0.0.1:8000/in/modules/${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})

export const delUser = (id) => axios.delete(`http://127.0.0.1:8000/in/ua/${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})

export const delAgent = (id) => axios.delete(`http://127.0.0.1:8000/in/agents${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})


// Put specific
export const putModule = (id) => axios.put(`http://127.0.0.1:8000/in/modules/${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})

export const putUser = (id) => axios.put(`http://127.0.0.1:8000/in/ua/${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})

export const putAngent = (id) => axios.put(`http://127.0.0.1:8000/in/agents${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})