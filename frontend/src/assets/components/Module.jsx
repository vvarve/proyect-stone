import { useEffect, useState } from "react"
import { useAndCompileContext } from "./context/CompileContext"
import { useForm } from "react-hook-form"


export const Module = () => {
const {getDataModules, dataConsultedModules, payloadToken, editDataModule, errorData,postDataModule,deleteDataModule, getIdModule, dataConsultedModulForId} = useAndCompileContext()
const [modal, setModal] = useState(false)
const [rowId, setRowId] = useState(0)
const [edit, setEdit] = useState(false)
const [del, setDel] = useState(false)
const {handleSubmit, register} = useForm()

const handlePutModule = handleSubmit((data) => {
   editDataModule(data)

})

const handleCreateModule = handleSubmit((data)=> {
    postDataModule(data) 
})

useEffect(()=> {
    const effectGetModules = async () => await getDataModules()
    console.log("EFFECT MODULES WHEN PAYLOAD CHANGE")
    effectGetModules()
},[payloadToken])
    
    return (
            <section>
                {errorData.errorchangeip && <div className="errorip"><p>You internet protocol has changed!</p></div>}

                {del && payloadToken.superuser | (payloadToken.staff  && payloadToken.conditions.delete) && <div className="modal-delete">
                    <h4>Do you want delete this row?</h4>
                    <button onClick={() => setDel(!del) & deleteDataModule(rowId)} type="button" className="btn-delete-modal">Accept</button>
                    <button onClick={() => setDel(!del)} type="button"className="btn-cancel-modal">Cancel</button>
                </div>}
                

                {edit && payloadToken.superuser | (payloadToken.staff && payloadToken.conditions.put) && <div className="modal-editingi">
                    <button onClick={() => setEdit(!edit)} type="button" className="btn-x-editingi">X</button>
                    <h3>EDIT</h3>
                            <form onSubmit={(e) => handlePutModule(e)} className="form-modal-editingi">
                            {dataConsultedModulForId.map((data) => {
                                return <>
                            
                                        <label htmlFor="module" className="label-modal-editingi">module : {data.module}</label> 
                                        <input type="text" name="module" placeholder={data.Module} {...register("module", {required: true, maxLength: 25})}/>
                                        <div className="div-check-box-editingi-modal">
                                            <label htmlFor="get" className="label-modal-editingi">get</label>
                                            <input type="checkbox" name="get" {...register("get")}/>
                                            <label htmlFor="put" className="label-modal-editingi">put</label>
                                            <input type="checkbox" name="put" {...register("put")} />
                                            <label htmlFor="post" className="label-modal-editingi">post</label>
                                            <input type="checkbox" name="post"  {...register("post")} />
                                            <label htmlFor="delete" className="label-modal-editingi" >delete</label>
                                            <input type="checkbox" name="delete" {...register("delete")} />
                                        </div>
                                        <input type="number" name="id" value={data.id} disabled={true} {...register("id")}/>
                                        <button className="btn-modal-editingi" type="submit">editing module</button>
                                        {errorData && <p className="error-message">{errorData.message}</p>}
                                    
                                        </>
                                })}
                                </form>
                    </div> }

                { modal && payloadToken.superuser | (payloadToken.staff && payloadToken.conditions.post) && <div className="modal-create">
                    <button onClick={() => setModal(!modal)} type="button" className="btn-x-create">X</button>
                    <h3>CREATE MODULE</h3>
                    
                        <form  onSubmit={(e) => handleCreateModule(e)} className="form-modal-create">
                        <label htmlFor="module" className="label-modal-create">module</label> 
                        <input type="text" name="module" {...register("module", {required: true, maxLength: 25})}/>
                        <div className="div-check-box-create-modal">
                            <label htmlFor="get" className="label-modal-create">get</label>
                            <input type="checkbox" name="get" {...register("get")} />
                            <label htmlFor="put" className="label-modal-create">put</label>
                            <input type="checkbox" name="put" {...register("put")} />
                            <label htmlFor="post" className="label-modal-create">post</label>
                            <input type="checkbox" name="post" {...register("post")} />
                            <label htmlFor="delete" className="label-modal-create">delete</label>
                            <input type="checkbox" name="delete" {...register("delete")} />
                        </div>
                        <button className="btn-modal-create" type="submit">create module</button>
                        </form>


                        {errorData && <p className="error-message">{errorData.message}</p>}


                </div>}

            <h1>TABLE MODULES</h1>


            <div className="div-CV">
                <button onClick={() => getDataModules()} type="button" className="btn-get">RELOAD TABLE</button>
                {payloadToken.superuser | payloadToken.staff &&  <button  onClick={() => setModal(!modal)} type="button" className="btn-create">CREATE MODULE</button>}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>module</th>
                        <th>GET DATA</th>
                        <th>EDITING DATA</th>
                        <th>SAVING DATA</th>
                        <th>DELETE DATA</th>
                        <th>REGISTERED</th>
                        <th>EDITING</th>
                    </tr>


                </thead>
                <tbody>
                
                {dataConsultedModules.length ? dataConsultedModules.map((data, index)=>{
                    return <tr key={index}>
                    
                                <td>{data.module}</td>
                                <td>{data.get ? "True" : "False"}</td>
                                <td>{data.put ? "True" : "False"}</td>
                                <td>{data.post ? "True" : "False"}</td>
                                <td>{data.delete ? "True" : "False"}</td>
                                <td>{data.register}</td>
                                <td className={"td-none" }>
                                {payloadToken.superuser && <button onClick={(e) => setDel(!del) & setRowId(e.target.id)} id={data.id} className={"btn-del"}>DEL</button>}
                                {(payloadToken.staff && payloadToken.conditions.put) | payloadToken.superuser && <button onClick={(e) => getIdModule(e.target.id) & setEdit(!edit)} id={data.id} className="btn-edit">EDIT</button>}
                                </td>
                            </tr>  
                }):
                
                        <tr>
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