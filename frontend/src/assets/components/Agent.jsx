import { useEffect, useState } from "react"
import { useAndCompileContext } from "./context/CompileContext"
import {useForm} from "react-hook-form"


export const Agent = () => {
const {getDataAgents,getDataUsers, postDataAgent, editDataAgent, deleteDataAgent, getIdAgent, dataConsultedAgentForId, getDataModules, dataConsultedAgents,dataConsultedUsers, dataConsultedModules, payloadToken, errorData} = useAndCompileContext()
const [modal, setModal] = useState(false)
const [rowId, setRowId] = useState(0)
const [edit, setEdit] = useState(false)
const [del, setDel] = useState(false)
const {handleSubmit, register} = useForm()

const handlePutAgent = handleSubmit((data) => {
    editDataAgent(data)
})

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
            {errorData.errorchangeip && <div className="errorip"><p>You internet protocol has changed!</p></div>}

            <h1>TABLE AGENTS</h1>

            {del && payloadToken.superuser | (payloadToken.staff  && payloadToken.conditions.delete) && <div className="modal-delete">
                <h4>Do you want delete this row?</h4>
                <button onClick={() => setDel(!del) & deleteDataAgent(rowId)} type="button" className="btn-delete-modal">Accept</button>
                <button onClick={() => setDel(!del)} type="button"className="btn-cancel-modal">Cancel</button>
            </div>}


            {edit && payloadToken.superuser | (payloadToken.staff && payloadToken.conditions.put) && <div className="modal-editingi">
                <button onClick={() => setEdit(!edit) & getDataModules() & getDataUsers()} type="button" className="btn-x-editingi">X</button>
                <h3>EDITING AGENT</h3>
                
                <form id="form-edit" onSubmit={(e) => handlePutAgent(e)} className="form-modal-editingi">
                        <label htmlFor="agent" className="label-modal-editingi">agent</label>
                        <select name="agent" id="" {...register("agent", {required: true})}>
                            {dataConsultedAgentForId && dataConsultedAgentForId.map((data) => {return <option key={data.id} value={data.id}>{data.agent}</option>})}
                            {dataConsultedUsers && dataConsultedUsers.map((data, index) => { return <option key={index} value={data.id}>{data.username}</option>})}
                        </select>
                        <label htmlFor="module" className="label-modal-editingi">group or module</label>
                        <select name="module" id="" {...register("group", {required: true})}>
                            {dataConsultedAgentForId && dataConsultedAgentForId.map((data) => {return <option key={data.id}  value={data.id}>{data.group}</option>})}
                            {dataConsultedModules && dataConsultedModules.map((data, index) => { return <option key={index} value={data.id}>{data.module}</option>})}
                        </select>
                            {dataConsultedAgentForId && dataConsultedAgentForId.map((data) => {
                                return <>
                                        <label htmlFor="DNI" className="label-modal-editingi" >DNI</label> 
                                        <input type="text" name="DNI" placeholder={data.dni} {...register("dni")}/>
                                        <label htmlFor="Address" className="label-modal-editingi">Address</label> 
                                        <input type="Address" name="Address" placeholder={data.address} {...register("address")} />
                                        <input type="number" name="_id" defaultValue={data.id} disabled={true} {...register("_id")}/>
                                    </>
                            })}
                            <button htmlFor="form-edit" className="btn-modal-editingi" type="submit">EDIT agent</button>
                            {errorData && <p className="error-message">{errorData.message}</p>}
                </form>
            </div> }


            { modal && payloadToken.superuser | (payloadToken.staff && payloadToken.conditions.post) && <div className="modal-create">
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
                    {errorData && <p className="error-message" >{errorData.message}</p>}
                </form>
            </div>  }

            <div className="div-CV">
                <button onClick={() => getDataAgents()} type="button" className="btn-get">RELOAD TABLE</button>
                {payloadToken.superuser | payloadToken.staff && <button  onClick={() => setModal(!modal) & getDataModules() & getDataUsers()} type="button" className="btn-create">CREATE AGENT</button>}
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
                        {payloadToken.superuser && <th>Secret Key</th>}
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
                                {payloadToken.superuser && <td>{data.secretKey}</td>}
                                <td className="td-none">
                                {payloadToken.superuser | (payloadToken.staff && payloadToken.conditions.delete) && <button onClick={(e) => setDel(!del) & setRowId(e.target.id)} id={data.id} className={"btn-del"}>DEL</button>}
                                {payloadToken.staff | payloadToken.superuser && <button onClick={(e) => getIdAgent(e.target.id) & setEdit(!edit)} id={data.id} className="btn-edit">EDIT</button>}
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