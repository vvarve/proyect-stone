import { useAndCompileContext } from "./context/CompileContext"

export const Module = () => {
const {getDataModules, dataConsulted} = useAndCompileContext()


    
    return (
            <section>

            <h1>TABLE MODULES</h1>


            <div className="div-CV">
                <button onClick={() => getDataModules()} type="button" className="btn-get">RELOAD TABLE</button>
                <button   type="button" className="btn-create">CREATE MODULE</button>
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
                
                {dataConsulted.length ? dataConsulted.map((data, index)=>{
                    return <tr key={index}>
                    
                                <td>{data.module}</td>
                                <td>{data.get ? "True" : "False"}</td>
                                <td>{data.put ? "True" : "False"}</td>
                                <td>{data.post ? "True" : "False"}</td>
                                <td>{data.delete ? "True" : "False"}</td>
                                <td>{data.register}</td>
                                <td>
                                <button className="btn-del">DEL</button>
                                <button className="btn-edit">EDIT</button>
                                </td>
                            </tr> 
                }):
                
                        <tr>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
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