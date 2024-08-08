import { declareAndProvideContext } from "./declaredContext"
import { useState } from "react"
import { delAgent, delModule, delUser, getAgent, getAngentForId, getModule, getModuleForId, getUser, getUserForId, postAgents, postModule, postUser, putAngent, putModule, putUser, signIn, signOuten } from "../../logic/logic"
import { jwtDecode } from "jwt-decode"
import {useNavigate} from "react-router-dom"


 //Use and Compile the contexts Provides

export const PropsContext = ({children}) => {
const navigate = useNavigate()
const [dataConsultedAgentForId, setDataConsultedAgentForId] = useState([])
const [dataConsultedUserForId, setDataConsultedUserForId] = useState([])
const [dataConsultedModulForId, setDataConsultedModulForId] = useState([])
const [dataConsultedAgents, setDataConsultedAgents] = useState([])
const [dataConsultedUsers, setDataConsultedUsers] = useState([])
const [dataConsultedModules, setDataConsultedModules] = useState([])
const [errorData, setErrorData] = useState([])
const [payloadToken, setPayloadToken] = useState(localStorage.getItem("access") ? jwtDecode(localStorage.getItem("access")) : "")



const hookForElseAndClearData = () => {
        setErrorData([{"message": "error not key"}])
        setPayloadToken("")
        localStorage.clear()
        navigate("/")
}

const getCredentials = async (data) => {
    await signIn(data.username, data.password)
        .then(response => localStorage.clear() & localStorage.setItem("refresh", response.data.refresh) & localStorage.setItem("access", response.data.access) & setPayloadToken(response.data.access) & setErrorData([]) & navigate("/"))
        .catch(error => setErrorData([...error.message]) & localStorage.clear() & setPayloadToken(""))
}


const signOut = async () => {
    if (localStorage.getItem("refresh")){
        await signOuten(localStorage.getItem("refresh"))
        .then(response => hookForElseAndClearData())
        .catch(error => setErrorData([...error.message]))
    }
    else {
        hookForElseAndClearData()
    }
}

const getDataUsers = async () => {
    if (localStorage.getItem("access")) {
        await getUser(localStorage.getItem("access"))
           .then(response => setDataConsultedUsers([...response.data]))
           .catch(error => setErrorData([...error.message]))
       }
   else {
        hookForElseAndClearData()
   }
}


const getDataModules = async () => {
    if (localStorage.getItem("access")) {
         await getModule(localStorage.getItem("access"))
            .then(response => setDataConsultedModules([...response.data]))
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}

const getDataAgents = async () => {
    if (localStorage.getItem("access")) {
        await getAgent(localStorage.getItem("access"))
           .then(response => setDataConsultedAgents([...response.data]))
           .catch(error => setErrorData([...error.message]))
       }
   else {
        hookForElseAndClearData()
}
}


const postDataUsers = async (data) => {
    if (localStorage.getItem("access")) {
         await postUser(data)
            .then(response => getDataUsers())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}


const postDataModule = async (data) => {
    if (localStorage.getItem("access")) {
         await postModule(data)
            .then(response => getDataModules())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}

const postDataAgent = async (data) => {
    if (localStorage.getItem("access")) {
         await postAgents(data)
            .then(response => getDataAgents())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}


const deleteDataModule = async (data) => {
    if (localStorage.getItem("access")) {
         await delModule(data)
            .then(response => getDataModules())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}

const getIdModule = async (data) => {
    if (localStorage.getItem("access")) {
         await getModuleForId(data)
            .then(response => setDataConsultedModulForId([response.data]))
            .catch(error => setErrorData([...error.message]) & console.log(error))
        }
    else {
        hookForElseAndClearData()
    }

}


const editDataModule = async (data) => {
    if (localStorage.getItem("access")) {
         await putModule(data)
            .then(response => getDataModules())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}


const getIdAgent = async (data) => {
    if (localStorage.getItem("access")) {
         await getAngentForId(data)
            .then(response => setDataConsultedAgentForId([response.data]))
            .catch(error => setErrorData([...error.message]) & console.log(error))
        }
    else {
        hookForElseAndClearData()
    }

}


const deleteDataAgent = async (data) => {
    if (localStorage.getItem("access")) {
         await delAgent(data)
            .then(response => getDataAgents())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}


const editDataAgent = async (data) => {
    if (localStorage.getItem("access")) {
         await putAngent(data)
            .then(response => getDataModules())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}

const getIdUser = async (data) => {
    if (localStorage.getItem("access")) {
         await getUserForId(data)
            .then(response => setDataConsultedUserForId([response.data]))
            .catch(error => setErrorData([...error.message]) & console.log(error))
        }
    else {
        hookForElseAndClearData()
    }

}


const deleteDataUser = async (data) => {
    if (localStorage.getItem("access")) {
         await delUser(data)
            .then(response => getDataUsers())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}

const editDataUser = async (data) => {
    if (localStorage.getItem("access")) {
         await putUser(data)
            .then(response => getDataUsers())
            .catch(error => setErrorData([...error.message]))
        }
    else {
        hookForElseAndClearData()
    }

}



    return (
        <declareAndProvideContext.Provider value={
            {getDataUsers,postDataAgent, editDataAgent, editDataUser, deleteDataUser, dataConsultedUserForId, getIdUser,  deleteDataAgent, getIdAgent, deleteDataModule, dataConsultedAgentForId, editDataModule, getIdModule, dataConsultedModulForId, dataConsultedAgents,dataConsultedModules, dataConsultedUsers, getDataModules, getDataAgents, getCredentials, errorData, payloadToken, signOut, postDataUsers,postDataModule}
        }>
            {children}
        </declareAndProvideContext.Provider>
    )
}