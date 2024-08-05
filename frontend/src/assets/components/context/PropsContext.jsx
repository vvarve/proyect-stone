import { declareAndProvideContext } from "./declaredContext"
import { useState } from "react"
import { getAgent, getModule, getUser, signIn, signOuten } from "../../logic/logic"
import { useJwt } from "react-jwt";


 //Use and Compile the contexts Provides

export const PropsContext = ({children}) => {
const token = localStorage.getItem("access")
const [dataConsulted, setDataConsulted] = useState([])
const [errorData, setErrorData] = useState([])
const { decodedToken, isExpired } = useJwt(token)

// const payload = () => {
//     const token = localStorage.getItem("access")
    
//     return decodedToken
// }

const getCredentials = async (data) => {
    await signIn(data.username, data.password)
        .then(response => localStorage.clear() & localStorage.setItem("refresh", response.data.refresh) & localStorage.setItem("access", response.data.access))
        .catch(error => setErrorData([...error.message]) & localStorage.clear())
}


const signOut = async () => {
    await signOuten(localStorage.getItem("refresh"))
        .then(response => localStorage.clear())
        .catch(error => setErrorData([...error.message]))
}

const getDataUsers = async () => {
    if (localStorage.getItem("access")) {
        await getUser(localStorage.getItem("access"))
           .then(response => setDataConsulted([...response.data]))
           .catch(error => setErrorData([...error.message]))
       }
   else {
       setErrorData([{"message": "error not key"}])
   }
}


const getDataModules = async () => {
    if (localStorage.getItem("access")) {
         await getModule(localStorage.getItem("access"))
            .then(response => setDataConsulted([...response.data]))
            .catch(error => setErrorData([...error.message]))
        }
    else {
        setErrorData([{"message": "error not key"}])
    }

}

const getDataAgents = async () => {
    if (localStorage.getItem("access")) {
        await getAgent(localStorage.getItem("access"))
           .then(response => setDataConsulted([...response.data]))
           .catch(error => setErrorData([...error.message]))
       }
   else {
       setErrorData([{"message": "error not key"}])
   }
}

    return (
        <declareAndProvideContext.Provider value={
            {getDataUsers, dataConsulted, getDataModules, getDataAgents, getCredentials, errorData, decodedToken, signOut}
        }>
            {children}
        </declareAndProvideContext.Provider>
    )
}