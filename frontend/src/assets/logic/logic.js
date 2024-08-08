import axios from "axios"



// login and register with User
export const signIn = (username, password) => axios.post("http://127.0.0.1:8000/in/t/",{username, password})

export const signOuten = (key) => axios.post("http://127.0.0.1:8000/in/t/refresh/", {refresh: key}) 



// get all data
export const getAgent = (key) => axios.get("http://127.0.0.1:8000/in/agents", {headers: {Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }})

export const getModule = (key) => axios.get("http://127.0.0.1:8000/in/modules", {headers: {Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }})

export const getUser = (key) => axios.get("http://127.0.0.1:8000/in/ua", {headers: {Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }})

// post Users

export const postUser = async (data) =>  {
    await axios.post("http://127.0.0.1:8000/in/ua", 
    {email: data.email, 
    is_active: data.is_active, 
    is_staff: data.is_staff, 
    is_superuser: data.is_superuser, 
    password: data.password, 
    username: data.username
    }, 
    {headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("access"), 
    'Content-Type': 'application/json' }}
)}


export const postModule = async (data) =>  {
    await axios.post("http://127.0.0.1:8000/in/modules", 
    {module: data.module,
    get: data.get,
    put: data.put,
    post: data.post,
    delete: data.delete
    }, 
    {headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("access"), 
    'Content-Type': 'application/json' }}
)}


export const postAgents = async (data) =>  {
    await axios.post("http://127.0.0.1:8000/in/agents", 
    {agent: data.agent,
    group: data.group,
    dni: data.dni,
    address: data.address
    }, 
    {headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("access"), 
    'Content-Type': 'application/json' }}
)}


// Del specific 
export const delModule = (id) => axios.delete(`http://127.0.0.1:8000/in/modules/del/${id}`,{headers: {"Authorization": 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})

export const delUser = (id) => axios.delete(`http://127.0.0.1:8000/in/ua/${id}`,{headers: {"Authorization": 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})

export const delAgent = (id) => axios.delete(`http://127.0.0.1:8000/in/agents/${id}`,{headers: {"Authorization": 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})


// Put specific
export const putModule = async (data) =>  {
    await axios.put(`http://127.0.0.1:8000/in/modules/${data.id}`, 
    {module: data.module,
    get: data.get,
    put: data.put,
    post: data.post,
    delete: data.delete
    }, 
    {headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("access"), 
    'Content-Type': 'application/json' }}
)}

export const putUser = async (data) => {
    await axios.put(`http://127.0.0.1:8000/in/ua/${data.number}`, 
    {username: data.username,
    password: data.password,
    email: data.email,
    is_active: data.is_active,
    is_staff: data.is_staff,
    is_superuser: data.is_superuser
    }, 
    {headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("access"), 
    'Content-Type': 'application/json' }}
)}

export const putAngent = async (data) => { 
    await axios.put(`http://127.0.0.1:8000/in/agents/${data._id}`, 
    {agent: data.agent,
    group: data.group,
    dni: data.dni,
    address: data.address
    }, 
    {headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("access"), 
    'Content-Type': 'application/json' }}
)}


export const getModuleForId = (data) => axios.get(`http://127.0.0.1:8000/in/modules/${data}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json'}})

export const getUserForId = (id) => axios.get(`http://127.0.0.1:8000/in/ua/${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})

export const getAngentForId = (id) => axios.get(`http://127.0.0.1:8000/in/agents/${id}`,{headers: {Authorization: 'Bearer ' + localStorage.getItem("access"), 'Content-Type': 'application/json' }})