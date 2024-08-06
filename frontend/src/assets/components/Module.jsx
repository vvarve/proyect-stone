import { useEffect, useState } from "react"
import { useAndCompileContext } from "./context/CompileContext"
import { useForm } from "react-hook-form"


export const Module = () => {
const {getDataModules, dataConsultedModules, payloadToken, errorData,postDataModule,deleteDataModule} = useAndCompileContext()
const [modal, setModal] = useState(false)
const [modalD, setModalD] = useState(false)
const [rowId, setRowId] = useState(0)
const {handleSubmit, register, formState: {errors}} = useForm()

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

                <div className={modalD ? "modal-delete" : "modal-create-nodisplay"}>
                    <h4>Do you want delete this row?</h4>
                    <button onClick={() => setModalD(!modalD) & deleteDataModule(rowId)} type="button" className="btn-delete-modal">Accept</button>
                    <button onClick={() => setModalD(!modalD)} type="button"className="btn-cancel-modal">Cancel</button>
                </div>

                <div className={modal ? "modal-create" : "modal-create-nodisplay"}>
                    <button onClick={() => setModal(!modal)} type="button" className="btn-x-create">X</button>
                    <h3>CREATE MODULE</h3>
                    
                    <form onSubmit={(e) => handleCreateModule(e)} className="form-modal-create">
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
                        {errorData && <p>{errorData}</p>}
                    </form>
                </div>

            <h1>TABLE MODULES</h1>


            <div className="div-CV">
                <button onClick={() => getDataModules()} type="button" className="btn-get">RELOAD TABLE</button>
                <button  onClick={() => setModal(!modal)} type="button" className="btn-create">CREATE MODULE</button>
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
                                <td className={(payloadToken.staff || payloadToken.superuser) ? "td-none"  : "class-btns-nodisplay"}>
                                <button onClick={(e) => setModalD(!modalD) & setRowId(e.target.id)} id={data.id} className={!payloadToken.superuser ? "class-btns-nodisplay" : "btn-del"}>DEL</button>
                                <button className="btn-edit">EDIT</button>
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



                    {/* <tr>
                        <td>algo</td>
                        <td>algo</td>
                        <td>algo</td>
                        <td>algo</td>
                        <td>algo</td>
                        <td>
                        <button className="btn-del">DEL</button>
                        <button className="btn-edit">EDIT</button>
                        </td>
                    </tr> */}

        </section>
    )
}