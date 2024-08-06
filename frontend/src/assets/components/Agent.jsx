import { useEffect, useState } from "react"
import { useAndCompileContext } from "./context/CompileContext"
import {useForm} from "react-hook-form"


export const Agent = () => {
const {getDataAgents,getDataUsers, postDataAgent, getDataModules, dataConsultedAgents,dataConsultedUsers, dataConsultedModules, payloadToken, errorData} = useAndCompileContext()
const [modal, setModal] = useState(false)
const {handleSubmit, register, formState: {errors}} = useForm()

const handleCreateAgent = handleSubmit((data) => {
    postDataAgent(data)
})

useEffect(()=> {
    const effectGetAgents = async () => await getDataAgents()
    console.log("EFFECT AGENTS WHEN PAYLOAD CHANGE")
    effectGetAgents()
},[payloadToken])

    return(
        <section>
            <h1>TABLE AGENTS</h1>


            <div className={modal ? "modal-create" : "modal-create-nodisplay"}>
                <button onClick={() => setModal(!modal) & getDataModules() & getDataUsers()} type="button" className="btn-x-create">X</button>
                <h3>CREATE AGENT</h3>
                
                <form onSubmit={(e) => handleCreateAgent(e)} className="form-modal-create">
                <label htmlFor="agent" className="label-modal-create">agent</label>
                <select name="agent" id="" {...register("agent")}>
                    <option value="">select a option</option>
                    {dataConsultedUsers && dataConsultedUsers.map((data, index) => { return <option key={index} value={data.id}>{data.username}</option>})}
                </select>

                <label htmlFor="module" className="label-modal-create">group or module</label>
                <select name="module" id="" {...register("group")}>
                    <option value="">select a option</option>
                    {dataConsultedModules && dataConsultedModules.map((data, index) => { return <option key={index} value={data.id}>{data.module}</option>})}
                </select>
                    
                    
                    <label htmlFor="DNI" className="label-modal-create">DNI</label> 
                    <input type="text" name="DNI" {...register("dni")}/>
                    
                    <label htmlFor="Address" className="label-modal-create">Address</label> 
                    <input type="Address" name="Address" {...register("address")} />
                    
                    <button className="btn-modal-create" type="submit">create agent</button>
                    {errorData && <p>{errorData}</p>}
                </form>
            </div>  

            <div className="div-CV">
                <button onClick={() => getDataAgents()} type="button" className="btn-get">RELOAD TABLE</button>
                <button  onClick={() => setModal(!modal) & getDataModules() & getDataUsers()} type="button" className="btn-create">CREATE AGENT</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Agent</th>
                        <th>Group</th>
                        <th>Last ip</th>
                        <th>Last connection</th>
                        <th>DNI</th>
                        <th>Address</th>
                        <th>Inactive</th>
                        <th>Secret Key</th>
                        <th>Editing</th>
                    </tr>
                </thead>
                <tbody>
                
                {dataConsultedAgents ? dataConsultedAgents.map((data, index)=> {
                    return  <tr key={index}>
                                <td>{data.agent}</td>
                                <td>{data.group}</td>
                                <td>{data.current_ip}</td>
                                <td>{data.last_connection}</td>
                                <td>{data.dni}</td>
                                <td>{data.address}</td>
                                <td>{data.inactive ? "True": "False"}</td>
                                <td>{data.secretKey}</td>
                                <td className={(payloadToken.staff || payloadToken.superuser) ? "td-none"  : "class-btns-nodisplay"}>
                                <button className={!payloadToken.superuser ? "class-btns-nodisplay" : "btn-del"}>DEL</button>
                                <button className="btn-edit">EDIT</button>
                                </td>
                            </tr>
                })
            
                :
                        <tr>
                                <td>NONE</td>
                                <td>NONE</td>
                                <td>NONE</td>
                                <td>NONE</td>
                                <td>NONE</td>
                                <td>NONE</td>
                                <td>NONE</td>
                                <td>NONE</td>
                                <td>
                                <button className="btn-del">DEL</button>
                                <button className="btn-edit">EDIT</button>
                                </td>
                        </tr>


                }

                </tbody>



            </table>

        </section>
    )
}